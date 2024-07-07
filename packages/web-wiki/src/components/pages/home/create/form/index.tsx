import {Form, FormItem, Input} from "@atom-ui/core";
import {FC, PropsWithChildren} from "react";
import {SCHEMA} from "@/config/pages/book";
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
        <FormItem name="name" label="{#分支名#}" description={"{#使用分支控制，可以在不影响主分支的情况下，推进翻译的改进。#}"}>
            <Input placeholder={"{#请输入分支名#}"} />
        </FormItem>
        { props.children }
    </Form>
}
