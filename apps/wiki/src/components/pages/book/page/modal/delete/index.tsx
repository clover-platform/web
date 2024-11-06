import {t} from "@easykit/common/utils/locale";
import {Button, Dialog, DialogProps} from "@easykit/design";
import {FC, useCallback, useEffect, useState} from "react";
import {CatalogSelector} from "@/components/common/selector/catalog";
import {deletePage} from "@/rest/page";
import {useParams} from "next/navigation";
import { useAlert, useMessage } from "@easykit/design"

export type DeleteModalProps = {
    onSuccess?: () => void;
    id: number;
    hasChildren: boolean;
} & DialogProps;

export const DeleteModal: FC<DeleteModalProps> = (props) => {
    const { id, hasChildren, onSuccess, visible } = props;
    const [parentId, setParentId] = useState<number|undefined>();
    const p = useParams();
    const { bookPath } = p;
    const alert = useAlert();
    const msg = useMessage();
    const [pending, setPending] = useState(false);

    const deletePageAction = useCallback(async  () => {
        setPending(true);
        const { success, message } = await deletePage({
            bookPath: bookPath as string,
            id,
            parent: parentId
        })
        setPending(false);
        if(success) {
            onSuccess?.();
        }else{
            msg.error(message);
        }
    }, [bookPath, id, parentId, onSuccess])

    const onSubmit = useCallback(async () => {
        if(!parentId && hasChildren) {
            alert.confirm({
                title: t("确认"),
                description: t("如果指定新的父级，子页面将会一并删除，是否继续？"),
                onOk: deletePageAction
            });
        }else{
            await deletePageAction();
        }
    }, [bookPath, id, parentId, deletePageAction])

    useEffect(() => {
        if(!visible) {
            setParentId(undefined);
        }
    }, [visible]);

    return <Dialog
        {...props}
        title={t("删除页面")}
        maskClosable={false}
    >
        <div className={"space-y-2"}>
            <div className={"text-center text-secondary-foreground/50"}>{t("是否要删除当前页面？")}</div>
            {
                hasChildren ? <div className={"flex justify-center items-center"}>
                    <span className={"text-secondary-foreground/50"}>{t("移动子页面到：")}</span>
                    <CatalogSelector
                        value={parentId ? `${parentId}` : undefined}
                        onChange={(v) => setParentId(v ? Number(v) : undefined)}
                        disabledKeys={id ? [`${id}`] : []}
                        className={"flex-1 z-[100]"}
                    />
                </div> : null
            }
        </div>
        <div className={"flex justify-end items-center mt-4 space-x-2"}>
            <Button onClick={props.onCancel} variant={"outline"}>{t("取消")}</Button>
            <Button loading={pending} onClick={onSubmit}>{t("确定")}</Button>
        </div>
    </Dialog>
}
