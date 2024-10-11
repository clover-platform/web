import {Form, FormItem, Input, Textarea} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import { SCHEMA } from "@/config/pages/entry/form";
import { MultiBranchSelect } from "@/components/pages/worktop/select/multi-branch";
import TextareaAutosize from "react-textarea-autosize";

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
            <TextareaAutosize
                minRows={3}
                placeholder={"{#请输入原始语言词条#}"}
                className={"p-2 border w-full rounded-md"}
            />
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
