import { FC, PropsWithChildren, useState } from "react";
import {SCHEMA} from "@/config/pages/access/authority/form";
import { Button, Form, FormItem, Input, useMessage } from "@atom-ui/core";
import ApiSelector from "@/components/pages/access/authority/form/api-selector";
import AuthoritySelector from "@/components/pages/access/authority/form/authority-selector";
import {addAuthority, editAuthority} from "@/rest/access";

export interface AuthorityFormProps extends PropsWithChildren {
    onSuccess?: () => void;
    authority?: any;
    type: 'add' | 'edit'
}

const AuthorityForm: FC<AuthorityFormProps> = (props) => {
    const {
        onSuccess = () => {},
        authority,
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
        schema={SCHEMA}
        onSubmit={onSubmit}
        defaultValues={authority}
    >
        <FormItem name="parentId" label="{#上级#}">
            <AuthoritySelector disabledNodeId={authority?.id} />
        </FormItem>
        <FormItem name="name" label="{#名称#}">
            <Input placeholder={"{#请输入权限名称#}"} />
        </FormItem>
        <FormItem name="key" label={"{#权限码#}"}>
            <Input placeholder="{#请输入权限码#}" />
        </FormItem>
        <FormItem name="apis" label={"{#关联接口#}"}>
            <ApiSelector />
        </FormItem>
        <Button loading={submitting} long type={"submit"}>{"{#保存#}"}</Button>
    </Form>
}

export default AuthorityForm;
