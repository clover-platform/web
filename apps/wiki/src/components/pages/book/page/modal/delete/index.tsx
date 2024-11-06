import {t} from "@easykit/common/utils/locale";
import {Button, Dialog, DialogProps} from "@easykit/design";
import {FC, useCallback, useEffect, useState} from "react";
import {CatalogSelector} from "@/components/common/selector/catalog";

export type DeleteModalProps = {
    onSuccess?: () => void;
    id: number;
    hasChildren: boolean;
} & DialogProps;

export const DeleteModal: FC<DeleteModalProps> = (props) => {
    const { id, hasChildren, onSuccess, visible } = props;
    const [parentId, setParentId] = useState<number|undefined>();

    const onSubmit = useCallback(() => {
        console.log("delete", id, 'new parent', parentId);
    }, [parentId, id, onSuccess])

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
            <Button onClick={onSubmit}>{t("确定")}</Button>
            <Button onClick={props.onCancel} variant={"outline"}>{t("取消")}</Button>
        </div>
    </Dialog>
}
