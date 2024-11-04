import { t } from "@easykit/common/utils/locale";
import {FC, useCallback, useEffect} from "react";
import {useCollectLoading} from "@/hooks/use.collect.loading";
import {Spin, useMessage} from "@easykit/design";
import classNames from "classnames";
import {useCollected} from "@/hooks/use.collected";
import {collect as collectRest} from "@/rest/page";
import {useParams} from "next/navigation";

export type CollectTitleProps = {
    id: number;
    collected: boolean;
}

export const CollectTitle: FC<CollectTitleProps> = (props) => {
    const { id } = props;
    const [loading, setLoading] = useCollectLoading(id);
    const [collected, setCollected] = useCollected(id);
    const msg = useMessage();
    const params = useParams();
    const { bookPath } = params

    useEffect(() => {
        setCollected(props.collected);
    }, [props.collected]);

    const onItemClick = useCallback(async () => {
        setLoading(true);
        const {success, message} = await collectRest({
            bookPath: bookPath as string,
            id,
            collect: !collected
        });
        setLoading(false);
        if(!success) {
            msg.error(message);
        }else{
            setCollected(!collected);
        }
    }, [id, collected, setLoading, bookPath])

    return <div
        onClick={loading ? () => {} : onItemClick}
        className={classNames(
            "w-full flex justify-center items-center space-x-2",
            loading ? "opacity-50 cursor-not-allowed" : ""
        )}
    >
        <div className={"flex-1"}>
            { collected ? t("取消收藏") : t("收藏") }
        </div>
        <div className={"flex justify-center items-center"}>
            { loading ? <Spin className={"w-3 h-3"} /> : null }
        </div>
    </div>
}
