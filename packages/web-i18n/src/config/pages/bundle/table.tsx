import {DataTableColumn} from "@atom-ui/core/components/uix/data-table";
import {DropdownMenuItemProps} from "@atom-ui/core";
import {Bundle} from "@/types/pages/bundle";

export const COLUMNS: DataTableColumn<Bundle>[] = [
    {
        accessorKey: "name",
        header: "{#名称#}",
        enableHiding: false,
        className: "min-w-[200px]",
    },
    {
        accessorKey: "isDefault",
        header: "{#默认分支#}",
        enableHiding: false,
        className: "!w-[200px]",
    },
    {
        accessorKey: "updateTime",
        header: "{#最后更新#}",
        enableHiding: false,
        formatters: ["time"],
        className: "!w-[200px]",
    },
]

export const ROW_ACTIONS: DropdownMenuItemProps[] = [
    {
        id: "rename",
        type: "item",
        label: "{#重命名#}"
    },
];
