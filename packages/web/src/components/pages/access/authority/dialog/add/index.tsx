import {Dialog, DialogProps} from "@atom-ui/core";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import AuthorityForm from "@/components/pages/access/authority/form";

export interface AddAuthorityDialogProps extends PropsWithChildren<DialogProps>{
    onSuccess?: () => void;
}

const AddAuthorityDialog: FC<AddAuthorityDialogProps> = (props) => {
    const [formKey, setFormKey] = useState(Date.now());

    useEffect(() => {
        if(props.visible) setFormKey(Date.now());
    }, [props.visible]);

    return  <Dialog
        {...props}
        maskClosable={false}
        title={"{#添加权限#}"}
        className={"w-[460px]"}
    >
        <AuthorityForm
            type={"add"}
            key={formKey}
            onSuccess={props.onSuccess}
        />
    </Dialog>
}

export default AddAuthorityDialog;
