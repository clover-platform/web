import {Button, Dialog} from "@atom-ui/core";
import {DialogProps} from "@atom-ui/core";
import {FC, useState} from "react";
import {CreateBookForm} from "@/components/pages/home/create/form";

export type CreateBookModalProps = {
    onSuccess?: () => void;
} & DialogProps;

export const CreateBookModal: FC<CreateBookModalProps> = (props) => {
    const [loading, setLoading] = useState(false);

    const onSubmit = (values: any) => {
        console.log(values);
    }

    return <Dialog
        {...props}
        title={"{#新建知识库#}"}
        maskClosable={false}
    >
        <CreateBookForm onSubmit={onSubmit}>
            <div className={"space-x-2 flex justify-end"}>
                <Button loading={loading} type={"submit"}>{"{#提交#}"}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {"{#取消#}"}
                </Button>
            </div>
        </CreateBookForm>
    </Dialog>
}
