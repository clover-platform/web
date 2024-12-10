import { Button, Dialog, DialogProps, useMessage } from "@easykit/design";
import {FC, useEffect, useState} from "react";
import { edit, EditEntryData } from "@/rest/entry";
import { EntryEditForm } from "@/components/pages/worktop/main/panel/entry/form/edit";
import { Entry } from "@/types/pages/entry";
import { t } from '@clover/public/locale';
import {useParams} from "next/navigation";
import {useAtom} from "jotai/index";
import {branchesState} from "@/state/worktop";

export type CreateEntryModalProps = {
    entry: Entry;
    onSuccess?: () => void;
} & DialogProps;

export const EditEntryModal: FC<CreateEntryModalProps> = (props) => {
    const { entry } = props;
    const [loading, setLoading] = useState(false);
    const msg = useMessage();
    const [formKey, setFormKey] = useState(Date.now());
    const { module } = useParams();
    const [branches] = useAtom(branchesState);
    const branch = branches.find(b => b.id === entry?.branchId);

    const onSubmit = async (data: EditEntryData) => {
        setLoading(true);
        data.id = entry.id;
        data.module = module as string;
        data.branch = branch?.name!;
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
        title={t("编辑词条")}
        maskClosable={false}
    >
        <EntryEditForm defaultValues={entry} key={formKey} onSubmit={onSubmit}>
            <div className={"flex justify-end items-center space-x-2"}>
                <Button loading={loading} type={"submit"}>{t("保存")}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {t("取消")}
                </Button>
            </div>
        </EntryEditForm>
    </Dialog>
}
