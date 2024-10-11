import { Button, Dialog, DialogProps, Form, FormItem, Input, Space, useMessage } from "@easykit/design";
import { FC, useState } from "react";
import { rename } from "@/rest/branch";
import { useSearchParams } from "next/navigation";
import { Branch } from "@/types/pages/branch";
import { SCHEMA } from "@/config/pages/module/branch/rename/form";

export type RenameBranchModalProps = {
    onSuccess?: () => void;
    branch: Branch;
} & DialogProps;

export const RenameBranchModal: FC<RenameBranchModalProps> = (props) => {
    const search = useSearchParams();
    const id = search.get('id');
    const [loading, setLoading] = useState(false);
    const msg = useMessage();
    const { branch } = props;

    const onSubmit = async (data: any) => {
        setLoading(true);
        data.moduleId = Number(id);
        data.id = branch.id;
        const { success, message } = await rename(data);
        setLoading(false);
        if(success) {
            props.onSuccess?.();
        }else{
            msg.error(message);
        }
    }

    return <Dialog
        {...props}
        title={"{#新建分支#}"}
        maskClosable={false}
    >
        <Form
            schema={SCHEMA}
            onSubmit={onSubmit}
            defaultValues={branch}
        >
            <FormItem name="name" label="{#分支名#}" description={"{#使用分支控制，可以在不影响主分支的情况下，推进翻译的改进。#}"}>
                <Input placeholder={"{#请输入分支名#}"} />
            </FormItem>
            <Space className={"justify-end"}>
                <Button loading={loading} type={"submit"}>{"{#保存#}"}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {"{#取消#}"}
                </Button>
            </Space>
        </Form>
    </Dialog>
}
