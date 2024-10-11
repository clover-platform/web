import { Button, Dialog, DialogProps, Space, useMessage } from "@easykit/design";
import { FC, useState } from "react";
import { ModuleBranchForm } from "@/components/pages/branch/form";
import { create, CreateBranchData } from "@/rest/branch";
import { useSearchParams } from "next/navigation";

export type NewBranchModalProps = {
    onSuccess?: () => void;
} & DialogProps;

export const NewBranchModal: FC<NewBranchModalProps> = (props) => {
    const search = useSearchParams();
    const id = search.get('id');
    const [loading, setLoading] = useState(false);
    const msg = useMessage();

    const onSubmit = async (data: CreateBranchData) => {
        setLoading(true);
        data.moduleId = Number(id);
        const { success, message } = await create(data);
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
        <ModuleBranchForm onSubmit={onSubmit}>
            <Space className={"justify-end"}>
                <Button loading={loading} type={"submit"}>{"{#提交#}"}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {"{#取消#}"}
                </Button>
            </Space>
        </ModuleBranchForm>
    </Dialog>
}
