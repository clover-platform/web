import { Form, FormItem, Input, Textarea } from "@atom-ui/core";
import {FC, PropsWithChildren} from "react";
import { SCHEMA } from "@/config/pages/member/form";
import { RoleSelect } from "@/components/pages/member/invite/form/role-select";

export type MemberInviteFormProps = PropsWithChildren<{
    onSubmit?: (data: any) => void;
    defaultValues?: any;
}>;

export const MemberInviteForm:FC<MemberInviteFormProps> = (props) => {
    const {
        defaultValues = {}
    } = props;

    return <Form
        schema={SCHEMA}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="roles" label="{#角色#}">
            <RoleSelect />
        </FormItem>
        <FormItem name="emails" label="{#邮箱#}" description={"{#多个邮箱请使用英文,隔开#}"}>
            <Textarea placeholder={"tom@demo.com,jane@demo.com"}/>
        </FormItem>
        <FormItem name="content" label="{#内容#}" description={"{#将作为邮件的附加消息进行发送。#}"}>
            <Textarea placeholder={"{#请输入#}"}/>
        </FormItem>
        { props.children }
    </Form>
}
