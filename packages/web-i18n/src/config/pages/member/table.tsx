import { DropdownMenuItemProps, FilterItemProps, Input } from "@atom-ui/core";
import { DataTableColumn } from "@atom-ui/core/components/uix/data-table";
import { Module } from "@/types/pages/module";
import { Member } from "@/types/pages/member";
import { MemberRole } from "@/components/pages/member/role";

export const FILTERS: FilterItemProps[] = [
    {
        field: 'keyword',
        render: () => <Input placeholder={"{#请输入关键词#}"}/>,
    },
]

export const COLUMNS: DataTableColumn<Member>[] = [
    {
        accessorKey: "user.username",
        header: "{#名称#}",
        enableHiding: false,
        className: "w-[200px] min-w-[200px]",
    },
    {
        accessorKey: "user.email",
        header: "{#邮箱#}",
        className: "min-w-[200px]",
    },
    {
        accessorKey: "type",
        header: "{#角色#}",
        enableHiding: false,
        className: "w-[200px] min-w-[200px]",
        cell: (cell) => {
            const data = cell.row.original;
            return <div className={"space-x-2"}>
                {data.roles?.map((role) => <MemberRole key={role} value={role} />)}
            </div>
        }
    },
];


export const ROW_ACTIONS: DropdownMenuItemProps[] = [
    {
        id: "detail",
        type: "item",
        label: "{#详情#}"
    },
];