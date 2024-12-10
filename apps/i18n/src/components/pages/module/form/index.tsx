import {Form, FormItem, Input, Textarea} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import {getSchema} from "@/config/pages/module/form";
import { LanguageSelect } from "@/components/common/select/language";
import { MultiLanguageSelect } from "@/components/common/select/multi-language";
import { t } from '@clover/public/locale';

export interface ModuleFormProps extends PropsWithChildren {
    onSubmit?: (data: any) => void;
    defaultValues?: any;
}

const ModuleForm:FC<ModuleFormProps> = (props) => {
    const {
        defaultValues = {}
    } = props;

    return <Form
        schema={getSchema()}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="name" label={t("名称")} description={t("唯一标识只能是小写字母和-，小写字母开头")}>
            <Input placeholder={t("请输入模块名称")} className={"max-w-96"} />
        </FormItem>
        <FormItem name="identifier" label={t("唯一标识")}>
            <Input placeholder={t("请输入唯一标识")} className={"max-w-96"} />
        </FormItem>
        <FormItem name="description" label={t("描述")}>
            <Textarea placeholder={t("请输入模块描述")} className={"max-w-6xl"} />
        </FormItem>
        <FormItem name="source" label={t("源语言")}>
            <LanguageSelect placeholder={t("请输入选择源语言")} className={"max-w-96"} />
        </FormItem>
        <FormItem name="targets" label={t("目标语言")}>
            <MultiLanguageSelect className={"max-w-6xl"} />
        </FormItem>
        { props.children }
    </Form>
}

export default ModuleForm;
