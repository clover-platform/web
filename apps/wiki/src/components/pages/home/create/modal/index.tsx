import {Button, Dialog, useMessage} from "@easykit/design";
import {DialogProps} from "@easykit/design";
import {FC, useState} from "react";
import {CreateBookForm} from "@/components/pages/home/create/form";
import {create, CreateBookData} from "@/rest/book";

export type CreateBookModalProps = {
    onSuccess?: () => void;
} & DialogProps;

export const CreateBookModal: FC<CreateBookModalProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const msg = useMessage();

    const onSubmit = async (values: CreateBookData) => {
        setLoading(true);
        const { success, message } = await create(values);
        setLoading(false);
        if(success) {
            props.onSuccess?.();
        }else{
            msg.error(message);
        }
    }

    return <Dialog
        {...props}
        title={t("新建知识库")}
        maskClosable={false}
    >
        <CreateBookForm onSubmit={onSubmit}>
            <div className={"space-x-2 flex justify-end"}>
                <Button loading={loading} type={"submit"}>{t("提交")}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {t("取消")}
                </Button>
            </div>
        </CreateBookForm>
    </Dialog>
}
