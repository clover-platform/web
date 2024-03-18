import { DataTableColumn } from "@atom-ui/core/components/uix/data-table";
import { DropdownMenuItemProps, FilterItemProps, Input } from "@atom-ui/core";
import EnableSelector from "@clover/admin/src/components/pages/access/role/form/enable-selector";

export const COLUMNS: DataTableColumn<any>[] = [
    {
        accessorKey: "name",
        header: "{#名称#}",
        enableHiding: false,
        className: "w-[300px] min-w-[200px]",
    },
    {
        accessorKey: "description",
        header: "{#描述#}",
        enableHiding: false,
        className: "min-w-[300px]"
    },
]

export const FILTERS: FilterItemProps[] = [
    {
        field: 'keyword',
        render: () => <Input placeholder={"{#请输入关键词#}"}/>,
    },
]

export const ROW_ACTIONS: DropdownMenuItemProps[] = [
    {
        id: "detail",
        type: "item",
        label: "{#详情#}"
    },
    {
        id: "edit",
        type: "item",
        label: "{#编辑#}"
    },
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
