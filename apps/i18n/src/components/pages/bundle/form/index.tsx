import {Checkbox, Form, FormItem, Input} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import { SCHEMA } from "@/config/pages/bundle/form";
import {BranchPattern} from "@/components/pages/bundle/form/branch-pattern";
import {ExportFormat} from "@/components/pages/bundle/form/export-format";
import { t } from '@easykit/common/utils/locale';

export type BundleFormProps = PropsWithChildren<{
    onSubmit?: (data: any) => void;
    defaultValues?: any;
}>;

export const BundleForm:FC<BundleFormProps> = (props) => {
    const {
        defaultValues = {}
    } = props;

    return <Form
        schema={SCHEMA}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="name" label={t("文件名")}>
            <Input placeholder={t("请输入文件名")} />
        </FormItem>
        <FormItem name="sources" label={t("原始内容")} description={t("使用通配符选择器（“**”、“*”、“?”、“[set]”、“\\”等）处理多个分支。")}>
            <BranchPattern />
        </FormItem>
        <FormItem name="includeSource" label="">
            <Checkbox field={"true"} label={t("包含项目源语言")} />
        </FormItem>
        <FormItem name="export" label={t("文件格式")}>
            <ExportFormat />
        </FormItem>
        { props.children }
    </Form>
}
