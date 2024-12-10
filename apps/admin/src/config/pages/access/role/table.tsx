import {DropdownMenuItemProps, FilterItemProps, Input} from "@easykit/design"
import { EnableSelector } from "@/components/pages/access/role/form/enable-selector";
import { DataTableColumn } from "@easykit/design/components/uix/data-table";
import {RoleStatus} from "@/components/pages/access/role/status";
import { t } from '@clover/public/locale';

export const getFilters = (): FilterItemProps[] => [
    {
        field: 'keyword',
        render: () => <Input placeholder={t("请输入关键词")}/>,
    },
    {
        field: 'enable',
        label: t("启用状态"),
        render: () => <EnableSelector />,
    }
]

export const getColumns = (): DataTableColumn<any>[] => [
    {
        accessorKey: "name",
        header: t("名称"),
        enableHiding: false,
        className: "w-[300px] min-w-[200px]",
    },
    {
        accessorKey: "description",
        header: t("描述"),
        enableHiding: false,
        className: "min-w-[300px]"
    },
    {
        accessorKey: "enable",
        enableHiding: false,
        header: t("启用状态"),
        className: "w-[100px] min-w-[100px]",
        cell: ({ row }) => {
            const data = row.original as any;
            return <RoleStatus value={data.enable} />;
        },
    },
]

export const ROW_ACTIONS = (cell: any): DropdownMenuItemProps[] => {
    return [
        {
            id: "detail",
            type: "item",
            label: t("详情")
        },
        {
            id: "edit",
            type: "item",
            label: t("编辑")
        },
        {
            type: "separator",
            id: 'separator.1'
        },
        {
            id: cell.enable ? "disable" : "enable",
            type: "item",
            label: cell.enable ? t("禁用"): t("启用")
        },
        {
            id: "delete",
            type: "item",
            label: t("删除")
        },
    ];
}
