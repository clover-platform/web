import {Button, Dialog, DialogProps} from "@easykit/design";
import {FC, useState} from "react";
import {t} from "@easykit/common/utils/locale";
import {AccessTokenForm} from "@/components/pages/profile/access/tokens/create/form";

export type CreateModalProps = {
    onSuccess: () => void;
} & DialogProps;

export const CreateModal: FC<CreateModalProps> = (props) => {
    const [loading, setLoading] = useState(false);

    return <Dialog
        {...props}
        title={t("创建令牌")}
        maskClosable={false}
    >
        <AccessTokenForm>
            <div className={"flex justify-end"}>
                <Button loading={loading} type={"submit"}>{t("提交")}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {t("取消")}
                </Button>
            </div>
        </AccessTokenForm>
    </Dialog>
}
