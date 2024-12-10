import { Button, Dialog, DialogProps, Space, useMessage } from "@easykit/design";
import { FC, useState } from "react";
import { ModuleBranchForm } from "@/components/pages/branch/form";
import { create, CreateBranchData } from "@/rest/branch";
import {useParams, useSearchParams} from "next/navigation";
import { t } from '@clover/public/locale';

export type NewBranchModalProps = {
    onSuccess?: () => void;
} & DialogProps;

export const NewBranchModal: FC<NewBranchModalProps> = (props) => {
    const { module } = useParams();
    const [loading, setLoading] = useState(false);
    const msg = useMessage();

    const onSubmit = async (data: CreateBranchData) => {
        setLoading(true);
        data.module = module as string;
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
        title={t("新建分支")}
        maskClosable={false}
    >
        <ModuleBranchForm onSubmit={onSubmit}>
            <Space className={"justify-end"}>
                <Button loading={loading} type={"submit"}>{t("提交")}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {t("取消")}
                </Button>
            </Space>
        </ModuleBranchForm>
    </Dialog>
}
