import {Dialog, DialogProps} from "@easykit/design";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import AuthorityForm from "@/components/pages/access/authority/form";
import { t } from '@easykit/common/utils/locale'

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
        title={t("添加权限")}
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
