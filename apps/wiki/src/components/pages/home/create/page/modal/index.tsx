import {t} from "@easykit/common/utils/locale";
import {Button, Dialog, DialogProps, useMessage} from "@easykit/design";
import {FC, useCallback, useState} from "react";
import {CreatePageForm} from "@/components/pages/home/create/page/form";
import {create, CreatePageData} from "@/rest/page";
import {useRouter} from "next/navigation";

export type CreatePageModalProps = {
    onSuccess?: () => void;
} & DialogProps;

export const CreatePageModal: FC<CreatePageModalProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const msg = useMessage();
    const router = useRouter();

    const onSubmit = useCallback(async (data: CreatePageData) => {
        setLoading(true);
        const {success, message, data: r} = await create(data);
        setLoading(false);
        if(success) {
            router.push(`/wiki/book/${data.bookPath}/page/${r?.id}/edit`);
        }else{
            msg.error(message);
        }
    }, [])

    return <Dialog
        {...props}
        title={t("新建页面")}
        maskClosable={false}
    >
        <CreatePageForm onSubmit={onSubmit}>
            <div className={"space-x-2 flex justify-end"}>
                <Button loading={loading} type={"submit"}>{t("创建")}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {t("取消")}
                </Button>
            </div>
        </CreatePageForm>
    </Dialog>
}
