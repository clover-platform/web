import {FC, useEffect, useState} from "react";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {Action} from "@clover/public/components/common/action";
import {Dropdown, Tooltip} from "@easykit/design";
import {useRouter, useSearchParams} from "next/navigation";
import { t } from '@easykit/common/utils/locale';

export type MorePageActionProps = {
    id: number;
    className?: string;
    onOpenChange?: (open: boolean) => void;
}

export const MorePageAction: FC<MorePageActionProps> = (props) => {
    const {
        id,
        className,
        onOpenChange,
    } = props;
    const [open, setOpen] = useState(false);
    const search = useSearchParams();
    const bookId = search.get("id");
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
                    router.push(`/{#LANG#}/wiki/book/page/edit/?id=${bookId}&page=${id}`)
                    e.stopPropagation();
                }
            },
            {
                id: "star",
                label: t("收藏"),
                type: "item",
            },
            {
                id: "copy",
                label: t("复制"),
                type: "item",
            },
            {
                id: "separator.2",
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
