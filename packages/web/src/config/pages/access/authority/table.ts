import { ColumnsProps, DropdownMenuItemProps } from "@clover/core";

export const COLUMNS: ColumnsProps[] = [
    {
        key: "name",
        label: "{#权限#}",
        style: {
            flex: "1",
            width: 0
        }
    },
    {
        key: "key",
        label: "{#权限码#}",
        width: 300
    },
]

export const ACTIONS: DropdownMenuItemProps[] = [
    {
        id: "edit",
        type: "item",
        label: "{#编辑#}"
    },
    {
        id: "delete",
        type: "item",
        label: "{#删除#}"
    },
];
