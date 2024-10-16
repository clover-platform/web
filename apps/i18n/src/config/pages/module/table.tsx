import { DataTableColumn } from "@easykit/design/components/uix/data-table";
import { DropdownMenuItemProps, FilterItemProps, Input } from "@easykit/design";
import TimeAgo from "javascript-time-ago";
import { i18n } from "@easy-kit/i18n/utils";
import {Module} from "@/types/pages/module";
import {Account} from "@clover/public/types/account";
import { t } from '@easykit/common/utils/locale';

export const COLUMNS: DataTableColumn<Module>[] = [
    {
        accessorKey: "name",
        header: t("名称"),
        enableHiding: false,
        className: "w-[300px] min-w-[200px]",
        cell: (cell) => {
            const timeAgo = new TimeAgo(t("LANG"))
            const data = cell.row.original;
            const { name, updateTime, memberSize } = data;
            const time = i18n(t("更新于%time"), {
                time: timeAgo.format(new Date(updateTime!))
            });
            const member = i18n(t("成员%size"), {
                size: memberSize
            });
            return <div>
                <div className={"text-base font-medium"}>{name}</div>
                <div className={"text-muted-foreground text-xs"}>{time} · {member}</div>
            </div>
        }
    },
    {
        accessorKey: "sourceSize",
        header: t("词条数"),
        enableHiding: false,
        className: "min-w-[150px]",
        cell: (cell) => {
            const data = cell.row.original;
            const { wordSize = 0 } = data;
            return <div>
                <div className={"text-base font-medium"}>{wordSize}</div>
                <div className={"text-muted-foreground text-xs"}>{t("词条数")}</div>
            </div>
        }
    },
    {
        accessorKey: "targetSize",
        header: t("语言"),
        enableHiding: false,
        className: "min-w-[150px]",
        cell: (cell) => {
            const data = cell.row.original;
            const { targetSize } = data;
            return <div>
                <div className={"text-base font-medium"}>{targetSize}</div>
                <div className={"text-muted-foreground text-xs"}>{t("目标语言")}</div>
            </div>
        }
    },
]

export const FILTERS: FilterItemProps[] = [
    {
        field: 'keyword',
        render: () => <Input placeholder={t("请输入关键词")}/>,
    },
]

export const ROW_ACTIONS = (profile: Account, row: Module): DropdownMenuItemProps[] => {
    return [
        {
            id: "detail",
            type: "item",
            label: t("详情")
        },
        {
            id: "activity",
            type: "item",
            label: t("动态")
        },
        {
            type: "separator",
            id: 'separator.1',
            hidden: row.owner !== profile.id,
        },
        {
            id: "delete",
            type: "item",
            label: t("删除"),
            hidden: row.owner !== profile.id,
        },
    ];
};
