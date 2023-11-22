import { Dialog, DialogProps } from "@clover/core";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import AuthorityForm from "@/components/pages/access/authority/form";
import { authorityDetail } from "@/rest/access";

export interface EditAuthorityDialogProps extends PropsWithChildren<DialogProps>{
    onSuccess?: () => void;
    dataId: number;
}

const EditAuthorityDialog: FC<EditAuthorityDialogProps> = (props) => {
    const {
        dataId,
        visible
    } = props;

    const [formKey, setFormKey] = useState(Date.now());
    const [authority, setAuthority] = useState({} as any);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        const {success, data} = await authorityDetail(dataId);
        setLoading(false);
        if(success) {
            setAuthority(data);
            setFormKey(Date.now());
        }
    }

    useEffect(() => {
        if(visible && dataId) load().then();
    }, [visible, dataId]);

    return  <Dialog
        {...props}
        maskClosable={false}
        title={"{#编辑权限#}"}
        className={"w-[460px]"}
        loading={loading}
    >
        <AuthorityForm
            type={"edit"}
            key={formKey}
            authority={authority}
            onSuccess={props.onSuccess}
        />
    </Dialog>
}

export default EditAuthorityDialog;
