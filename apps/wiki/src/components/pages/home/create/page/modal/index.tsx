import {t} from "@easykit/common/utils/locale";
import {Button, Dialog, DialogProps, useMessage} from "@easykit/design";
import {FC, useState} from "react";
import {CreatePageForm} from "@/components/pages/home/create/page/form";

export type CreatePageModalProps = {
    onSuccess?: () => void;
} & DialogProps;

export const CreatePageModal: FC<CreatePageModalProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const msg = useMessage();

    return <Dialog
        {...props}
        title={t("新建页面")}
        maskClosable={false}
    >
        <CreatePageForm>
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
