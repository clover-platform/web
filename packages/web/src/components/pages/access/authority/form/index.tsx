import { FC, PropsWithChildren, useState } from "react";
import {SCHEMA} from "@/config/pages/access/authority/form";
import { Button, Form, FormItem, Input, useMessage } from "@clover/core";
import ApiSelector from "@/components/pages/access/authority/form/api-selector";
import AuthoritySelector from "@/components/pages/access/authority/form/authority-selector";
import {addAuthority} from "@/rest/access";

export interface AuthorityFormProps extends PropsWithChildren {
    onSuccess?: () => void;
}

const AuthorityForm: FC<AuthorityFormProps> = (props) => {
    const {
        onSuccess = () => {}
    } = props

    const [submitting, setSubmitting] = useState(false);
    const msg = useMessage();

    const onSubmit = async (data: any) => {
        setSubmitting(true);
        const { success, message } = await addAuthority(data);
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
    >
        <FormItem name="parentId" label="{#上级#}">
            <AuthoritySelector />
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
