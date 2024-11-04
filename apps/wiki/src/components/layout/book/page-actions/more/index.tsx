import {FC, useEffect, useState} from "react";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {Action} from "@clover/public/components/common/action";
import {Dropdown, Tooltip} from "@easykit/design";
import {useParams, useRouter} from "next/navigation";
import { t } from '@easykit/common/utils/locale';
import {CollectTitle} from "@/components/layout/book/page-actions/more/collect-title";

export type MorePageActionProps = {
    id: number;
    className?: string;
    onOpenChange?: (open: boolean) => void;
    collected: boolean;
}

export const MorePageAction: FC<MorePageActionProps> = (props) => {
    const {
        id,
        className,
        onOpenChange,
        collected = false,
    } = props;
    const [open, setOpen] = useState(false);
    const params = useParams();
    const { bookPath } = params;
    const router = useRouter();

    useEffect(() => {
        onOpenChange?.(open);
    }, [open]);

    return <Dropdown
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
                    console.log("delete", item);
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
}
