import {FC, useEffect, useState} from "react";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {Action} from "@clover/public/components/common/action";
import {Dropdown, Select, Tooltip, useAlert, useMessage} from "@easykit/design";
import {useParams, useRouter} from "next/navigation";
import { t } from '@easykit/common/utils/locale';
import {CollectTitle} from "@/components/layout/book/page-actions/more/collect-title";
import {DeleteModal} from "@/components/pages/book/page/modal/delete";
import {useCatalogLoader} from "@/hooks/use.catalog.loader";

export type MorePageActionProps = {
    id: number;
    className?: string;
    onOpenChange?: (open: boolean) => void;
    collected: boolean;
    hasChildren: boolean;
}

export const MorePageAction: FC<MorePageActionProps> = (props) => {
    const {
        id,
        className,
        onOpenChange,
        collected = false,
        hasChildren,
    } = props;
    const [open, setOpen] = useState(false);
    const params = useParams();
    const { bookPath, pageId } = params;
    const router = useRouter();
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [_, load] = useCatalogLoader();

    useEffect(() => {
        onOpenChange?.(open);
    }, [open]);

    return <>
        <Dropdown
            onOpenChange={setOpen}
            className={open ? "opacity-100" : "opacity-0"}
            align={"start"}
            items={[
                {
                    id: "edit",
                    label: t("编辑"),
                    type: "item",
                    onItemClick: (item, e) => {
                        router.push(`/wiki/book/${bookPath}/page/${id}/edit`)
                        e.stopPropagation();
                    }
                },
                {
                    id: "star",
                    label: <CollectTitle id={id} collected={collected}/>,
                    type: "item",
                    onItemClick: (item, e) => {
                        e.stopPropagation();
                    }
                },
                {
                    id: "copy",
                    label: t("复制"),
                    type: "item",
                },
                {
                    id: "separator.1",
                    type: "separator",
                },
                {
                    id: "delete",
                    label: t("删除"),
                    type: "item",
                    onItemClick: (item, e) => {
                        setDeleteVisible(true);
                        e.stopPropagation();
                    }
                }
            ]}
        >
            <Tooltip content={t("更多操作")}>
                <Action
                    elType={"span"}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className={className}>
                    <DotsHorizontalIcon />
                </Action>
            </Tooltip>
        </Dropdown>
        <div onClick={(e) => e.stopPropagation()}>
            <DeleteModal
                visible={deleteVisible}
                id={id}
                hasChildren={hasChildren}
                onCancel={() => setDeleteVisible(false)}
                onSuccess={() => {
                    if(pageId === `${id}`) {
                        router.push(`/wiki/book/${bookPath}`)
                    }
                    load().then();
                    setDeleteVisible(false);
                }}
            />
        </div>
    </>
}
