import { Button, Dialog, DialogProps, Form, FormItem, Input, Space, useMessage } from "@easykit/design";
import { FC, useState } from "react";
import { rename } from "@/rest/branch";
import {useParams, useSearchParams} from "next/navigation";
import { Branch } from "@/types/pages/branch";
import {getSchema} from "@/config/pages/module/branch/rename/form";
import { t } from '@clover/public/locale';

export type RenameBranchModalProps = {
    onSuccess?: () => void;
    branch: Branch;
} & DialogProps;

export const RenameBranchModal: FC<RenameBranchModalProps> = (props) => {
    const { module } = useParams();
    const [loading, setLoading] = useState(false);
    const msg = useMessage();
    const { branch } = props;

    const onSubmit = async (data: any) => {
        setLoading(true);
        data.module = module;
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
        title={t("新建分支")}
        maskClosable={false}
    >
        <Form
            schema={getSchema()}
            onSubmit={onSubmit}
            defaultValues={branch}
        >
            <FormItem name="name" label={t("分支名") } description={t("使用分支控制，可以在不影响主分支的情况下，推进翻译的改进。")}>
                <Input placeholder={t("请输入分支名")} />
            </FormItem>
            <Space className={"justify-end"}>
                <Button loading={loading} type={"submit"}>{t("保存")}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {t("取消")}
                </Button>
            </Space>
        </Form>
    </Dialog>
}
