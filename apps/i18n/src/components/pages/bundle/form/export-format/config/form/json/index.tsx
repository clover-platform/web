import {Button, Checkbox, Form, FormItem, Space} from "@atom-ui/core";
import {FC} from "react";
import * as z from "zod";

export type JSONConfigFormProps = {
    onCancel?: () => void;
    onConfirm?: (data: any) => void;
    defaultValues?: any;
}

const SCHEMA = z.object({
    convert: z.boolean().optional(),
});


export const JSONConfigForm: FC<JSONConfigFormProps> = (props) => {
    const { onCancel, onConfirm, defaultValues } = props;
    const onSubmit = (data: any) => {
        onConfirm?.(data);
    }

    return <div className={"space-y-4"}>
        <Form
            schema={SCHEMA}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
        >
            <FormItem name="convert" label="">
                <Checkbox field={"true"} label={"{#以 . 作为分隔符转换为对象#}"} />
            </FormItem>
            <Space className={"justify-end"}>
                <Button type={"submit"}>
                    {"{#确定#}"}
                </Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => onCancel?.()}
                >
                    {"{#取消#}"}
                </Button>
            </Space>
        </Form>
    </div>
}