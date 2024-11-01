import {getSchema} from "@/config/pages/page/form";
import {Form, FormItem, Input} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import {t} from "@easykit/common/utils/locale";
import {NameLogoInput} from "@/components/pages/home/create/form/name-logo-input";

export type CreatePageFormProps = PropsWithChildren<{
    onSubmit?: (data: any) => void;
}>;

export const CreatePageForm: FC<CreatePageFormProps> = (props) => {
    return <Form
        schema={getSchema()}
        onSubmit={props.onSubmit}
    >
        <FormItem name="bookId" label={t("知识库")}>
            <NameLogoInput placeholder={t("请输入")}/>
        </FormItem>
        <FormItem name="title" label={t("标题")}>
            <Input placeholder={t("请输入")} />
        </FormItem>
        { props.children }
    </Form>
}
