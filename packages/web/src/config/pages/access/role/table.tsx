import { ColumnDef } from "@tanstack/react-table"
import {DropdownMenuItemProps, FilterItemProps, Input, Select} from "@clover/core"
import { CaretSortIcon } from '@radix-ui/react-icons';

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const FILTERS: FilterItemProps[] = [
    {
        field: 'keyword',
        label: '{#角色名#}',
        render: () => <Input placeholder={"{#请输入关键词#}"}/>,
    },
    {
        field: 'test',
        render: () => <Input placeholder={"{#请输入关键词#}"}/>,
    },
    {
        field: 'status',
        label: '{#状态#}',
        render: () => <Select
            placeholder={"{#请选择状态#}"}
            options={[
                { label: "测试", value: '1' },
                { label: "测试2", value: '2' }
            ]}
        />,
    }
]

export const COLUMNS: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "{#状态#}",
    },
    {
        accessorKey: "email",
        enableHiding: false,
        header: ({ column }) => {
            return (
                <div className={"flex justify-start items-center cursor-pointer"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </div>
            )
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
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

export const DATA: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.comm@example.comm@example.comm@example.com",
    },
]
