import {Form, FormItem, Input, Textarea} from "@atom-ui/core";
import {FC, PropsWithChildren} from "react";
import { SCHEMA } from "@/config/pages/entry/edit/form";
import TextareaAutosize from "react-textarea-autosize";

export interface EntryEditFormProps extends PropsWithChildren {
    onSubmit?: (data: any) => void;
    defaultValues?: any;
}

export const EntryEditForm:FC<EntryEditFormProps> = (props) => {
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
        { props.children }
    </Form>
}
