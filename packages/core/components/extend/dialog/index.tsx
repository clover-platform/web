import {
    Dialog as UIDialog,
    DialogDescription, DialogFooter,
    DialogHeader, DialogContent,
    DialogTitle,
} from "@clover/core/components/ui/dialog";
import { FC, PropsWithChildren } from "react";
import * as React from "react";

export type EventCallback = () => void;

export interface DialogProps extends PropsWithChildren {
    visible?: boolean;
    onCancel?: EventCallback;
    onOk?: EventCallback;
    className?: string;
    maskClosable?: boolean;
    closable?: boolean;
    title?: string;
    description?: string;
    footer?: React.ReactNode;
}

export const Dialog: FC<DialogProps> = (props) => {
    const {
        visible,
        onCancel =  () => {},
        onOk = () => {},
        maskClosable = true,
        className,
        closable = true,
        title,
        description,
        footer,
    } = props;

    return <UIDialog open={visible}>
        <DialogContent
            showClose={closable}
            onCloseClick={onCancel}
            onOverlayClick={maskClosable ? onCancel : () => {}}
            className={className}
        >
            {
                title || description ? <DialogHeader>
                    { title ? <DialogTitle>{title}</DialogTitle> : null }
                    { description ? <DialogDescription>{description}</DialogDescription> : null }
                </DialogHeader> : null
            }
            <div className={"my-2"}>
                { props.children }
            </div>

            {
                footer ? <DialogFooter>
                    { footer }
                </DialogFooter> : null
            }
        </DialogContent>
    </UIDialog>
}
