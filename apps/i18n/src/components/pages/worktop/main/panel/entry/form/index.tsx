import {Form, FormItem, Input, Textarea} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import {getSchema} from "@/config/pages/entry/form";
import { MultiBranchSelect } from "@/components/pages/worktop/select/multi-branch";
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
        schema={getSchema()}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="value" label={t("词条")}>
            <Textarea placeholder={t("请输入原始语言词条")}/>
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
