import { DataTableColumn } from "@atom-ui/core/components/uix/data-table";
import { DropdownMenuItemProps, FilterItemProps, Input } from "@atom-ui/core";
import TimeAgo from "javascript-time-ago";
import { i18n } from "@easy-kit/i18n/utils";

export const COLUMNS: DataTableColumn<any>[] = [
    {
        accessorKey: "name",
        header: "{#名称#}",
        enableHiding: false,
        className: "w-[300px] min-w-[200px]",
        cell: (cell) => {
            const timeAgo = new TimeAgo('{#LANG#}')
            const data = cell.row.original;
            const { name, updateTime, memberSize } = data;
            const time = i18n("{#更新于%time#}", {
                time: timeAgo.format(new Date(updateTime))
            });
            const member = i18n("{#成员%size#}", {
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
        header: "{#词条数#}",
        enableHiding: false,
        className: "min-w-[150px]",
        cell: (cell) => {
            const data = cell.row.original;
            const { sourceSize = 0 } = data;
            return <div>
                <div className={"text-base font-medium"}>{sourceSize}</div>
                <div className={"text-muted-foreground text-xs"}>{"{#词条数#}"}</div>
            </div>
        }
    },
    {
        accessorKey: "targetSize",
        header: "{#语言#}",
        enableHiding: false,
        className: "min-w-[150px]",
        cell: (cell) => {
            const data = cell.row.original;
            const { targetSize } = data;
            return <div>
                <div className={"text-base font-medium"}>{targetSize}</div>
                <div className={"text-muted-foreground text-xs"}>{"{#目标语言#}"}</div>
            </div>
        }
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
        label: "{#动态#}"
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