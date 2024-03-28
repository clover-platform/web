import { DataTableColumn } from "@atom-ui/core/components/uix/data-table";
import { DropdownMenuItemProps, FilterItemProps, Input } from "@atom-ui/core";

export const COLUMNS: DataTableColumn<any>[] = [
    {
        accessorKey: "name",
        header: "{#名称#}",
        enableHiding: false,
        className: "min-w-[200px]",
    },
    {
        accessorKey: "updateTime",
        header: "{#最后更新#}",
        enableHiding: false,
        formatters: ["time"],
        className: "!w-[200px]",
    },
]

export const FILTERS: FilterItemProps[] = [
    {
        field: 'keyword',
        render: () => <Input placeholder={"{#请输入关键词#}"}/>,
    },
]

export const ROW_ACTIONS = (cell: any): DropdownMenuItemProps[] => {
    const { isDefault  = false} = cell;
    const items: DropdownMenuItemProps[] = [
        {
            id: "rename",
            type: "item",
            label: "{#重命名#}"
        },
    ];
    if(!isDefault) {
        items.push({
            id: "merge",
            type: "item",
            label: "{#合并至默认分支#}"
        })
    }
    return [
        ...items,
        {
            type: "separator",
            id: 'separator.1'
        },
        {
            id: "delete",
            type: "item",
            label: "{#删除#}"
        },
    ];
}
