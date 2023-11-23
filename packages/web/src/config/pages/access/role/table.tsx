import { ColumnDef } from "@tanstack/react-table"
import {DropdownMenuItemProps, FilterItemProps, Input, Select} from "@clover/core"
import { CaretSortIcon } from '@radix-ui/react-icons';
import EnableSelector from "@/components/pages/access/role/form/enable-selector";

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const FILTERS: FilterItemProps[] = [
    {
        field: 'keyword',
        render: () => <Input placeholder={"{#请输入关键词#}"}/>,
    },
    {
        field: 'enable',
        label: '{#启用状态#}',
        render: () => <EnableSelector />,
    }
]

export const COLUMNS: ColumnDef<Payment>[] = [
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
    {
        accessorKey: "enable",
        enableHiding: false,
        header: "{#启用状态#}",
        className: "w-[100px] min-w-[100px]",
        cell: ({ row }) => {
            return "test";
        },
    },
]

export const ROW_ACTIONS: DropdownMenuItemProps[] = [
    {
        id: "my.account",
        type: "label",
        label: "{#我的账户#}"
    },
    {
        type: "separator",
        id: 'separator.1'
    },
    {
        id: "profile",
        type: "item",
        label: "{#Profile#}",
        shortcut: "⇧⌘P"
    },
    {
        id: "billing",
        type: "item",
        label: "{#Billing#}",
        shortcut: "⌘B",
        children: [
            {
                id: "email",
                type: "item",
                label: "{#Email#}",
            },
            {
                id: "message",
                type: "item",
                label: "{#Message#}",
            },
        ]
    },
    {
        type: "separator",
        id: 'separator.2'
    },
    {
        id: 'log.out',
        type: "item",
        label: "{#Log out#}"
    },
]
