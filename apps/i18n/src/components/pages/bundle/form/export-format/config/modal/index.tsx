import {Dialog, DialogProps} from "@atom-ui/core";
import {cloneElement, FC, ReactElement} from "react";

export type FormatConfigModalProps = {
    content: ReactElement;
    onConfirm: (data: any) => void;
    configDefault?: any;
    config?: any;
} & DialogProps

export const FormatConfigModal: FC<FormatConfigModalProps> = (props) => {
    return <Dialog
        {...props}
        maskClosable={false}
    >
        {
            cloneElement(props.content, {
                onCancel: props.onCancel,
                onConfirm: props.onConfirm,
                defaultValues: props.config || props.configDefault,
            })
        }
    </Dialog>
}