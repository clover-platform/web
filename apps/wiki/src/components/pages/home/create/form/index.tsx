import {Form, FormItem, Input, Select, Textarea} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import {PRIVACY_LIST, SCHEMA} from "@/config/pages/book/form";
import {ImageCropper} from "@easykit/common/components/cropper";

export type CreateBookFormProps = PropsWithChildren<{
    onSubmit?: (data: any) => void;
    defaultValues?: any;
}>;

export const CreateBookForm: FC<CreateBookFormProps> = (props) => {
    const {
        defaultValues = {
            name: ''
        }
    } = props;

    return <Form
        schema={SCHEMA}
        onSubmit={props.onSubmit}
        defaultValues={defaultValues}
    >
        <FormItem name="name" label=t("知识库名称")>
            <Input placeholder={t("请输入")} />
        </FormItem>
        <FormItem name="path" label=t("访问路径") description={t("小写字母和-，小写字母开头")}>
            <Input placeholder={t("请输入")} />
        </FormItem>
        <FormItem name="privacy" label=t("可见性")>
            <Select options={PRIVACY_LIST} placeholder={t("请选择")} />
        </FormItem>
        <FormItem name="logo" label=t("LOGO")>
            <ImageCropper
                className={"w-[100px] h-[100px]"}
                aspectRatio={1}
            />
        </FormItem>
        <FormItem name="description" label=t("描述")>
            <Textarea placeholder={t("请输入")} />
        </FormItem>
        { props.children }
    </Form>
}
