import { Button, Dialog, DialogProps, useMessage } from "@atom-ui/core";
import {FC, useEffect, useState} from "react";
import { edit, EditEntryData } from "@/rest/entry";
import { EntryEditForm } from "@/components/pages/module/worktop/main/panel/entry/form/edit";
import { Entry } from "@/types/pages/entry";

export type CreateEntryModalProps = {
    entry: Entry;
    onSuccess?: () => void;
} & DialogProps;

export const EditEntryModal: FC<CreateEntryModalProps> = (props) => {
    const { entry } = props;
    const [loading, setLoading] = useState(false);
    const msg = useMessage();
    const [formKey, setFormKey] = useState(Date.now());

    const onSubmit = async (data: EditEntryData) => {
        setLoading(true);
        data.id = entry.id;
        const { success, message } = await edit(data);
        setLoading(false);
        if(success) {
            props.onSuccess?.();
            setFormKey(Date.now());
        }else{
            msg.error(message);
        }
    }

    useEffect(() => {
        if(props.visible) setFormKey(Date.now());
    }, [props.visible])

    return <Dialog
        {...props}
        title={"{#编辑词条#}"}
        maskClosable={false}
    >
        <EntryEditForm defaultValues={entry} key={formKey} onSubmit={onSubmit}>
            <div className={"flex justify-end items-center space-x-2"}>
                <Button loading={loading} type={"submit"}>{"{#保存#}"}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {"{#取消#}"}
                </Button>
            </div>
        </EntryEditForm>
    </Dialog>
}
