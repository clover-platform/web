import {Form, FormItem, Input, Select, Textarea} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import {getPrivacyList, getSchema} from "@/config/pages/book/form";
import { t } from '@easykit/common/utils/locale';
import {NameLogoInput} from "@/components/pages/home/create/form/name-logo-input";
import {DEFAULT_COVER} from "@/config/book";

export type CreateBookFormProps = PropsWithChildren<{
    onSubmit?: (data: any) => void;
    defaultValues?: any;
}>;

export const CreateBookForm: FC<CreateBookFormProps> = (props) => {
    const {
        defaultValues = {
            nameAndLogo: {
                name: "",
                logo: DEFAULT_COVER,
            }
        }
    } = props;

    return <Form
        schema={getSchema()}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="nameAndLogo" label={t("知识库名称")}>
            <NameLogoInput placeholder={t("请输入")}/>
        </FormItem>
        <FormItem name="path" label={t("访问路径")}>
            <Input placeholder={t("请输入")} />
        </FormItem>
        <FormItem name="privacy" label={t("可见性")}>
            <Select options={getPrivacyList()} placeholder={t("请选择")} />
        </FormItem>
        <FormItem name="description" label={t("描述")}>
            <Textarea placeholder={t("请输入")} />
        </FormItem>
        { props.children }
    </Form>
}
