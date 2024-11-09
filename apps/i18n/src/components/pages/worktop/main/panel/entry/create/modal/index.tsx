import { Button, Checkbox, Dialog, DialogProps, Space, useMessage } from "@easykit/design";
import {FC, useEffect, useState} from "react";
import {useParams, useSearchParams} from "next/navigation";
import { EntryForm } from "@/components/pages/worktop/main/panel/entry/form";
import { create, CreateEntryData } from "@/rest/entry";
import { t } from '@easykit/common/utils/locale';

export type CreateEntryModalProps = {
    onSuccess?: (close?: boolean) => void;
} & DialogProps;

export const CreateEntryModal: FC<CreateEntryModalProps> = (props) => {
    const { module } = useParams();
    const [loading, setLoading] = useState(false);
    const [close, setClose] = useState(true);
    const msg = useMessage();
    const [formKey, setFormKey] = useState(Date.now());

    const onSubmit = async (data: CreateEntryData) => {
        setLoading(true);
        data.module = module as string;
        const { success, message } = await create(data);
        setLoading(false);
        if(success) {
            props.onSuccess?.(close);
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
        title={t("新增词条")}
        maskClosable={false}
    >
        <EntryForm key={formKey} onSubmit={onSubmit}>
            <div className={"flex justify-end items-center space-x-2"}>
                <div className="flex items-center space-x-1">
                    <Checkbox
                        onCheckedChange={(checked) => setClose(!checked)}
                        checked={!close} id="hold-entry-modal"
                    />
                    <label
                        htmlFor="hold-entry-modal"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {t("成功后不关闭窗口")}
                    </label>
                </div>
                <Button loading={loading} type={"submit"}>{t("提交")}</Button>
                <Button
                    variant={"outline"}
                    type={"button"}
                    onClick={() => props.onCancel?.()}
                >
                    {t("取消")}
                </Button>
            </div>
        </EntryForm>
    </Dialog>
}
