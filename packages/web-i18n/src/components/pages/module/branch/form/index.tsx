import {Form, FormItem, Input, RadioGroup} from "@atom-ui/core";
import {FC, PropsWithChildren} from "react";
import { SCHEMA, TYPE_OPTIONS } from "@/config/pages/module/branch/form";

export type ModuleBranchFormProps = PropsWithChildren<{
    onSubmit?: (data: any) => void;
    defaultValues?: any;
}>;

export const ModuleBranchForm:FC<ModuleBranchFormProps> = (props) => {
    const {
        defaultValues = {
            type: 'empty'
        }
    } = props;

    return <Form
        schema={SCHEMA}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="type" label="">
            <RadioGroup options={TYPE_OPTIONS} />
        </FormItem>
        <FormItem name="name" label="{#分支名#}" description={"{#使用分支控制，可以在不影响主分支的情况下，推进翻译的改进。#}"}>
            <Input placeholder={"{#请输入分支名#}"} />
        </FormItem>
        { props.children }
    </Form>
}
