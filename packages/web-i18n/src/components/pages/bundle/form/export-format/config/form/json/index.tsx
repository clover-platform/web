import {Button, Checkbox, Form, FormItem, Space} from "@atom-ui/core";
import {FC, useRef} from "react";
import * as z from "zod";

export type JSONConfigFormProps = {
    onCancel?: () => void;
    onConfirm?: (data: any) => void;
}

const SCHEMA = z.object({
    convert: z.boolean(),
});


export const JSONConfigForm: FC<JSONConfigFormProps> = (props) => {
    const { onCancel, onConfirm } = props;
    const form = useRef<any>();
    const onSubmit = (data: any) => {
        console.log(data)
    }

    return <div className={"space-y-4"}>
        <Form
            schema={SCHEMA}
            onSubmit={onSubmit}
            ref={form}
        >
            <FormItem name="convert" label="">
                <Checkbox field={"true"} label={"{#以 . 作为分隔符转换为对象#}"} />
            </FormItem>
        </Form>
        <Space className={"justify-end"}>
            <Button
                onClick={() => form.current.submit()}
                type={"button"}
            >
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
    </div>
}
