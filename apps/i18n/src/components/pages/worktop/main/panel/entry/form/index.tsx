import {Form, FormItem, Input, Textarea} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import { SCHEMA } from "@/config/pages/entry/form";
import { MultiBranchSelect } from "@/components/pages/worktop/select/multi-branch";
import TextareaAutosize from "react-textarea-autosize";
import { t } from '@easykit/common/utils/locale';

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
        <FormItem name="value" label={t("词条")}>
            <TextareaAutosize
                minRows={3}
                placeholder={t("请输入原始语言词条")}
                className={"p-2 border w-full rounded-md"}
            />
        </FormItem>
        <FormItem name="key" label={t("唯一标识")}>
            <Input placeholder={t("请输入唯一标识")} />
        </FormItem>
        <FormItem name="branches" label={t("分支")}>
            <MultiBranchSelect />
        </FormItem>
        { props.children }
    </Form>
}
