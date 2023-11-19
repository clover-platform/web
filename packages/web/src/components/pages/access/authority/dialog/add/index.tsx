import {Dialog, DialogProps} from "@clover/core";
import {FC, PropsWithChildren} from "react";
import AuthorityForm from "@/components/pages/access/authority/form";

export interface AddAuthorityDialogProps extends PropsWithChildren<DialogProps>{}

const AddAuthorityDialog: FC<AddAuthorityDialogProps> = (props) => {
    return  <Dialog
        {...props}
        maskClosable={false}
        title={"{#添加权限#}"}
        className={"w-[460px]"}
    >
        <AuthorityForm />
    </Dialog>
}

export default AddAuthorityDialog;
