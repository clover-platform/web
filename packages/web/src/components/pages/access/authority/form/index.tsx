import { FC, PropsWithChildren, useState } from "react";
import {SCHEMA} from "@/config/pages/access/authority/form";
import {Button, Form, FormItem, Input} from "@clover/core";
import ApiSelector from "@/components/pages/access/authority/form/api-selector";

export interface AuthorityFormProps extends PropsWithChildren {}

const AuthorityForm: FC<AuthorityFormProps> = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const onSubmit = (data: any) => {
        console.log(data);
    }

    return <Form
        schema={SCHEMA}
        onSubmit={onSubmit}
    >
        <FormItem name="account" label="{#邮箱或用户名#}">
            <Input placeholder={"{#请输入邮箱或用户名#}"} />
        </FormItem>
        <FormItem name="password" label={"{#密码#}"}>
            <Input placeholder="{#请输入密码#}" type={"password"} />
        </FormItem>
        <FormItem name="apis" label={"{#关联接口#}"}>
            <ApiSelector />
        </FormItem>
        <Button loading={submitting} long type={"submit"}>{"{#立即登录#}"}</Button>
    </Form>
}

export default AuthorityForm;
