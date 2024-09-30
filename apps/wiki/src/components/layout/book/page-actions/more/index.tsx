import {FC, useEffect, useState} from "react";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {Action} from "@clover/public/components/common/action";
import {Dropdown, Tooltip} from "@atom-ui/core";

export type MorePageActionProps = {
    id: number;
    className?: string;
    onOpenChange?: (open: boolean) => void;
}

export const MorePageAction: FC<MorePageActionProps> = (props) => {
    const {
        className,
        onOpenChange,
    } = props;
    const [open, setOpen] = useState(false);

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
                label: "{#编辑#}",
                type: "item",
                onItemClick: (item, e) => {
                    console.log("edit", item);
                    e.stopPropagation();
                }
            },
            {
                id: "rename",
                label: "{#重命名#}",
                type: "item",
            },
            {
                id: "star",
                label: "{#收藏#}",
                type: "item",
            },
            {
                id: "copy.link",
                label: "{#复制链接#}",
                type: "item",
            },
            {
                id: "separator.1",
                type: "separator",
            },
            {
                id: "copy",
                label: "{#复制#}",
                type: "item",
            },
            {
                id: "move",
                label: "{#移动#}",
                type: "item",
            },
            {
                id: "separator.2",
                type: "separator",
            },
            {
                id: "delete",
                label: "{#删除#}",
                type: "item",
                onItemClick: (item, e) => {
                    console.log("delete", item);
                    e.stopPropagation();
                }
            }
        ]}
    >
        <Tooltip content={"{#更多操作#}"}>
            <Action
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={className}>
                <DotsHorizontalIcon />
            </Action>
        </Tooltip>
    </Dropdown>
}
