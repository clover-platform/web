import {Form, FormItem, Input, Textarea} from "@atom-ui/core";
import {FC, PropsWithChildren} from "react";
import { SCHEMA } from "@/config/pages/module/form";
import { LanguageSelect } from "@/components/common/select/language";
import { MultiLanguageSelect } from "@/components/common/select/multi-language";

export interface ModuleFormProps extends PropsWithChildren {
    onSubmit?: (data: any) => void;
    defaultValues?: any;
}

const ModuleForm:FC<ModuleFormProps> = (props) => {
    const {
        defaultValues = {}
    } = props;

    return <Form
        schema={SCHEMA}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="name" label="{#名称#}" description={"{#唯一标识只能是小写字母和-，小写字母开头#}"}>
            <Input placeholder={"{#请输入模块名称#}"} className={"max-w-96"} />
        </FormItem>
        <FormItem name="identifier" label="{#唯一标识#}">
            <Input placeholder={"{#请输入唯一标识#}"} className={"max-w-96"} />
        </FormItem>
        <FormItem name="description" label="{#描述#}">
            <Textarea placeholder="{#请输入模块描述#}" className={"max-w-6xl"} />
        </FormItem>
        <FormItem name="source" label="{#源语言#}">
            <LanguageSelect placeholder="{#请输入选择源语言#}" className={"max-w-96"} />
        </FormItem>
        <FormItem name="targets" label="{#目标语言#}">
            <MultiLanguageSelect className={"max-w-6xl"} />
        </FormItem>
        { props.children }
    </Form>
}

export default ModuleForm;
