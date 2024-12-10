import {getSchema} from "@/config/pages/page/form";
import {Form, FormItem, Input} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import {t} from "@clover/public/locale";
import {NameLogoInput} from "@/components/pages/home/create/form/name-logo-input";
import {BookSelector} from "@/components/pages/home/create/page/form/book-selector";

export type CreatePageFormProps = PropsWithChildren<{
    onSubmit?: (data: any) => void;
}>;

export const CreatePageForm: FC<CreatePageFormProps> = (props) => {
    return <Form
        schema={getSchema()}
        onSubmit={props.onSubmit}
    >
        <FormItem name="bookPath" label={t("知识库")}>
            <BookSelector />
        </FormItem>
        <FormItem name="title" label={t("标题")}>
            <Input placeholder={t("请输入")} />
        </FormItem>
        { props.children }
    </Form>
}
