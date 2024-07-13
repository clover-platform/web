import {Form, FormItem, Input, Select, Textarea} from "@atom-ui/core";
import {FC, PropsWithChildren} from "react";
import {PRIVACY_LIST, SCHEMA} from "@/config/pages/book";
import {ImageCropper} from "@easy-kit/common/components/cropper";

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
        <FormItem name="logo" label="{#LOGO#}">
            <ImageCropper
                className={"w-[100px] h-[100px]"}
                aspectRatio={1}
            />
        </FormItem>
        <FormItem name="name" label="{#知识库名称#}">
            <Input placeholder={"{#请输入#}"} />
        </FormItem>
        <FormItem name="path" label="{#访问路径#}" description={"{#小写字母和-，小写字母开头#}"}>
            <Input placeholder={"{#请输入#}"} />
        </FormItem>
        <FormItem name="description" label="{#描述#}">
            <Textarea placeholder={"{#请输入#}"} />
        </FormItem>
        <FormItem name="privacy" label="{#可见性#}">
            <Select options={PRIVACY_LIST} placeholder={"{#请选择#}"} />
        </FormItem>
        { props.children }
    </Form>
}
