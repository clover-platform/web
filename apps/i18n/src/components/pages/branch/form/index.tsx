import {Form, FormItem, Input, SimpleRadioGroup} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import {getSchema, getTypeOptions} from "@/config/pages/module/branch/form";
import { t } from '@clover/public/locale';

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
        schema={getSchema()}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="type" label="">
            <SimpleRadioGroup options={getTypeOptions()} />
        </FormItem>
        <FormItem name="name" label={t("分支名")} description={t("使用分支控制，可以在不影响主分支的情况下，推进翻译的改进。")}>
            <Input placeholder={t("请输入分支名")} />
        </FormItem>
        { props.children }
    </Form>
}
