import {SCHEMA} from "@/config/pages/access/role/form";
import {Form, FormItem, Input, Switch, Textarea} from "@clover/core";
import {FC, PropsWithChildren} from "react";
import AuthorityTree from "../../authority/form/tree";

export interface RoleFormProps extends PropsWithChildren {
    onSubmit?: (data: any) => void;
    defaultValues?: any;
}

const RoleForm:FC<RoleFormProps> = (props) => {
    const {
        defaultValues = {}
    } = props;

    return <Form
        schema={SCHEMA}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="name" label="{#名称#}">
            <Input placeholder={"{#请输入角色名称#}"} />
        </FormItem>
        <FormItem name="description" label="{#描述#}">
            <Textarea placeholder="{#请输入角色描述#}" />
        </FormItem>
        <FormItem name="enable" label={"{#启用状态#}"}>
            <Switch />
        </FormItem>
        <FormItem name="authorities" label={"{#关联接口#}"}>
            <AuthorityTree />
        </FormItem>
        { props.children }
    </Form>
}

export default RoleForm;
