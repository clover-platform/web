import {FC, useCallback} from "react";
import {t} from "@easykit/common/utils/locale";
import classNames from "classnames";
import {Spin, useMessage} from "@easykit/design";
import {usePageCopyLoading} from "@/hooks/use.page.copy.loading";
import {copyPage} from "@/rest/page";
import {useParams, useRouter} from "next/navigation";
import {useCatalogLoader} from "@/hooks/use.catalog.loader";

export type CopyTitleProps = {
    id: number;
}

export const CopyTitle: FC<CopyTitleProps> = (props) => {
    const { id } = props;
    const [loading, setLoading] = usePageCopyLoading(id);
    const params = useParams();
    const { bookPath } = params;
    const msg = useMessage();
    const router = useRouter();
    const [_, load] = useCatalogLoader();

    const onItemClick = useCallback(async ()=> {
        setLoading(true);
        const { success, message, data } = await copyPage(bookPath as string, id);
        setLoading(false);
        if(success) {
            load().then();
            router.push(`/wiki/book/${bookPath}/page/${data?.id}/edit`);
        }else{
            msg.error(message);
        }
    }, [id])

    return <div
        onClick={loading ? () => {} : onItemClick}
        className={classNames(
            "w-full flex justify-center items-center space-x-2",
            loading ? "opacity-50 cursor-not-allowed" : ""
        )}
    >
        <div className={"flex-1"}>
            {t("复制")}
        </div>
        <div className={"flex justify-center items-center"}>
            {loading ? <Spin className={"w-3 h-3"}/> : null}
        </div>
    </div>
}
