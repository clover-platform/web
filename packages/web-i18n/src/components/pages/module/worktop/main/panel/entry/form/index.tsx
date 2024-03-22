import {Form, FormItem, Input, Textarea} from "@atom-ui/core";
import {FC, PropsWithChildren} from "react";
import { SCHEMA } from "@/config/pages/entry/form";
import { MultiBranchSelect } from "@/components/pages/module/worktop/select/multi-branch";

export interface EntryFormProps extends PropsWithChildren {
    onSubmit?: (data: any) => void;
    defaultValues?: any;
}

export const EntryForm:FC<EntryFormProps> = (props) => {
    const {
        defaultValues = {}
    } = props;

    return <Form
        schema={SCHEMA}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="value" label="{#词条#}">
            <Textarea placeholder={"{#请输入原始语言词条#}"}/>
        </FormItem>
        <FormItem name="key" label="{#唯一标识#}">
            <Input placeholder={"{#请输入唯一标识#}"} />
        </FormItem>
        <FormItem name="branches" label="{#分支#}">
            <MultiBranchSelect />
        </FormItem>
        { props.children }
    </Form>
}
