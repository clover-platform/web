import { DataTableColumn } from "@easykit/design/components/uix/data-table";
import { Badge, DropdownMenuItemProps, FilterItemProps, Input } from "@easykit/design";
import { Branch } from "@/types/pages/branch";
import { t } from '@easykit/common/utils/locale';

export const COLUMNS: DataTableColumn<Branch>[] = [
    {
        accessorKey: "name",
        header: t("名称"),
        enableHiding: false,
        className: "min-w-[200px]",
    },
    {
        accessorKey: "isDefault",
        header: t("默认分支"),
        enableHiding: false,
        className: "!w-[200px]",
        cell: (cell) => {
            const branch = cell.row.original;
            return branch.isDefault ? <Badge>{t("是")}</Badge> : null;
        }
    },
    {
        accessorKey: "updateTime",
        header: t("最后更新"),
        enableHiding: false,
        formatters: ["time"],
        className: "!w-[200px]",
    },
]

export const FILTERS: FilterItemProps[] = [
    {
        field: 'keyword',
        render: () => <Input placeholder={t("请输入关键词")}/>,
    },
]

export const ROW_ACTIONS = (cell: Branch): DropdownMenuItemProps[] => {
    const { isDefault  = false} = cell;
    const items: DropdownMenuItemProps[] = [
        {
            id: "rename",
            type: "item",
            label: t("重命名")
        },
    ];
    if(!isDefault) {
        items.push({
            id: "merge",
            type: "item",
            label: t("合并至默认分支")
        })
    }
    if(!isDefault) {
        items.push({
            type: "separator",
            id: 'separator.1'
        });
        items.push({
            id: "delete",
            type: "item",
            label: t("删除")
        })
    }
    return items;
}
