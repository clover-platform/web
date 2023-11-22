import {
    AlertDialog as UIAlertDialog,
    AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@clover/core/components/ui/alert-dialog";
import {FC, useState} from "react";
import { render as ReactDOMRender } from '../../../lib/react-dom';
import {Button} from "@clover/core/components/extend/button";

export interface ConfirmProps {
    title?: string;
    description?: string;
    cancelText?: string;
    okText?: string;
    onOk?: () => void | Promise<boolean|void> ;
    onCancel?: () => void;
    open?: boolean;
    confirmLoading?: boolean;
}

const AlertDialog: FC<ConfirmProps> = (props) => {
    const {
        okText = 'Confirm',
        cancelText = 'Cancel',
        description,
        title,
        onOk = () => {},
        onCancel = () => {},
    } = props;

    const [open, setOpen] = useState(props.open);
    const [loading, setLoading] = useState(false);

    return <UIAlertDialog {...props} open={open}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <Button
                    variant={"outline"}
                    onClick={() => {
                        setOpen(false);
                        onCancel();
                    }}
                >
                    {cancelText}
                </Button>
                <Button
                    loading={loading}
                    onClick={async () => {
                        const isAsync = onOk.constructor.name === 'AsyncFunction';
                        if(isAsync) {
                            setLoading(true);
                            const result = await onOk();
                            setLoading(false);
                            if(typeof result !== 'boolean') {
                                setOpen(false);
                            }else{
                                if(result) {
                                    setOpen(false);
                                }
                            }
                        }else{
                            onOk();
                        }
                    }}
                >
                    {okText}
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </UIAlertDialog>
}

export const useAlert = () => {
    return {
        confirm: (props: ConfirmProps) => {
            let root;
            const div = document.createElement('div');
            document.body.appendChild(div);
            const close = () => {
                setTimeout(() => {
                    root = root?._unmount();
                    if (div.parentNode) {
                        div.parentNode.removeChild(div);
                    }
                }, 200);
            }
            const onCancel = () => {
                close();
                props.onCancel?.();
            }
            root = ReactDOMRender(<AlertDialog {...props} open={true} onCancel={onCancel} />, div);
        }
    }
}
