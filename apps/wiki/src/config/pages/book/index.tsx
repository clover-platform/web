import {DataTableColumn} from "@atom-ui/core/components/uix/data-table";
import {DropdownMenuItemProps, FilterItemProps, Input} from "@atom-ui/core";
import {Book} from "@/types/pages/book";

export const COLUMNS: DataTableColumn<Book>[] = [
    {
        accessorKey: "name",
        header: "{#名称#}",
        enableHiding: false,
        className: "w-[300px] min-w-[200px]",
        cell: (cell) => {
            const data = cell.row.original;
            const { name, logo } = data;
            return <div className={"flex space-x-2 justify-start items-center"}>
                <div className={"w-8 h-8 rounded-md bg-secondary overflow-hidden"}>
                    {logo ? <img src={logo} alt={name} className={"w-full h-full"}/> : null }
                </div>
                <div>{name}</div>
            </div>
        }
    },
    {
        accessorKey: "description",
        header: "{#简介#}",
        enableHiding: false,
        className: "min-w-[150px]",
    },
    {
        accessorKey: "updateTime",
        header: "{#最后更新#}",
        enableHiding: false,
        className: "w-[200px] min-w-[200px]",
        formatters: ["time"],
    },
];


export const FILTERS: FilterItemProps[] = [
    {
        field: 'keyword',
        render: () => <Input placeholder={"{#请输入关键词#}"}/>,
    },
];

export const ROW_ACTIONS: DropdownMenuItemProps[] = [
    {
        id: "detail",
        type: "item",
        label: "{#详情#}"
    },
    {
        id: "activity",
        type: "item",
        label: "{#动态#}"
    },
];
