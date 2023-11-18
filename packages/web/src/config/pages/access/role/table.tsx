import { ColumnDef } from "@tanstack/react-table"
import {Button, FilterItemProps, Input, Select} from "@clover/core"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@clover/core";
import { DotsHorizontalIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { Checkbox } from "@clover/core"

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
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <DotsHorizontalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export const DATA: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
]
