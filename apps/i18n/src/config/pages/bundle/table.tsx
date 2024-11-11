import {DataTableColumn} from "@easykit/design/components/uix/data-table";
import {DropdownMenuItemProps} from "@easykit/design";
import {Bundle} from "@/types/pages/bundle";
import { BundleFormat } from "@/components/pages/bundle/format";
import { t } from '@easykit/common/utils/locale';

export const getColumns = (): DataTableColumn<Bundle>[] => [
    {
        accessorKey: "name",
        header: t("文件名"),
        enableHiding: false,
        className: "min-w-[200px]",
    },
    {
        accessorKey: "sources",
        header: t("分支"),
        enableHiding: false,
        className: "!w-[200px]",
    },
    {
        accessorKey: "export",
        header: t("导出格式"),
        enableHiding: false,
        className: "!w-[200px]",
        cell: (cell) => {
            const { format } = cell.row.original;
            return <BundleFormat value={format} />;
        }
    },
    {
        accessorKey: "createTime",
        header: t("创建时间"),
        enableHiding: false,
        formatters: ["time"],
        className: "!w-[200px]",
    },
]

export const getRowActions = (): DropdownMenuItemProps[] => [
    {
        id: "download",
        type: "item",
        label: t("下载")
    },
    {
        id: "delete",
        type: "item",
        label: t("删除")
    },
];
