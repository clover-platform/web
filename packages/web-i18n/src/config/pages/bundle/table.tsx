import {DataTableColumn} from "@atom-ui/core/components/uix/data-table";
import {DropdownMenuItemProps} from "@atom-ui/core";
import {Bundle} from "@/types/pages/bundle";
import { BundleFormat } from "@/components/pages/bundle/format";

export const COLUMNS: DataTableColumn<Bundle>[] = [
    {
        accessorKey: "name",
        header: "{#文件名#}",
        enableHiding: false,
        className: "min-w-[200px]",
    },
    {
        accessorKey: "sources",
        header: "{#分支#}",
        enableHiding: false,
        className: "!w-[200px]",
    },
    {
        accessorKey: "export",
        header: "{#导出格式#}",
        enableHiding: false,
        className: "!w-[200px]",
        cell: (cell) => {
            const { format } = cell.row.original;
            return <BundleFormat value={format} />;
        }
    },
    {
        accessorKey: "createTime",
        header: "{#创建时间#}",
        enableHiding: false,
        formatters: ["time"],
        className: "!w-[200px]",
    },
]

export const ROW_ACTIONS: DropdownMenuItemProps[] = [
    {
        id: "download",
        type: "item",
        label: "{#下载#}"
    },
    {
        id: "delete",
        type: "item",
        label: "{#删除#}"
    },
];
