import { FC, PropsWithChildren, useState } from "react";
import {getSchema} from "@/config/pages/access/authority/form";
import { Button, Form, FormItem, Input, useMessage } from "@easykit/design";
import ApiSelector from "@/components/pages/access/authority/form/api-selector";
import AuthoritySelector from "@/components/pages/access/authority/form/authority-selector";
import {addAuthority, editAuthority} from "@/rest/access";
import { t } from '@easykit/common/utils/locale'

export interface AuthorityFormProps extends PropsWithChildren {
    onSuccess?: () => void;
    authority?: any;
    type: 'add' | 'edit'
}

const AuthorityForm: FC<AuthorityFormProps> = (props) => {
    const {
        onSuccess = () => {},
        authority = {
            sort: `0`
        },
        type
    } = props

    const [submitting, setSubmitting] = useState(false);
    const msg = useMessage();

    const onSubmit = async (data: any) => {
        setSubmitting(true);
        const api = type === 'add' ? addAuthority : editAuthority;
        if(type === 'edit') {
            data.id = authority.id;
        }
        const { success, message } = await api(data);
        setSubmitting(false);
        if(success) {
            onSuccess();
        }else{
            msg.error(message);
        }
    }

    return <Form
        schema={getSchema()}
        onSubmit={onSubmit}
        defaultValues={authority}
    >
        <FormItem name="parentId" label={t("上级")}>
            <AuthoritySelector disabledNodeId={authority?.id} />
        </FormItem>
        <FormItem name="name" label={t("名称")}>
            <Input placeholder={t("请输入权限名称")} />
        </FormItem>
        <FormItem name="value" label={t("权限码")}>
            <Input placeholder={t("请输入权限码")} />
        </FormItem>
        <FormItem name="sort" label={t("排序")}>
            <Input placeholder={t("请输入排序号")} />
        </FormItem>
        <FormItem name="apis" label={t("关联接口")}>
            <ApiSelector />
        </FormItem>
        <Button loading={submitting} long type={"submit"}>{t("保存")}</Button>
    </Form>
}

export default AuthorityForm;
