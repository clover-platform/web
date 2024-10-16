import {DataTableColumn} from "@easykit/design/components/uix/data-table";
import {DropdownMenuItemProps, FilterItemProps, Input} from "@easykit/design";
import {Book} from "@/types/pages/book";

export const COLUMNS: DataTableColumn<Book>[] = [
    {
        accessorKey: "name",
        header: t("名称"),
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
        header: t("简介"),
        enableHiding: false,
        className: "min-w-[150px]",
    },
    {
        accessorKey: "updateTime",
        header: t("最后更新"),
        enableHiding: false,
        className: "w-[200px] min-w-[200px]",
        formatters: ["time"],
    },
];


export const FILTERS: FilterItemProps[] = [
    {
        field: 'keyword',
        render: () => <Input placeholder={t("请输入关键词")}/>,
    },
];

export const ROW_ACTIONS: DropdownMenuItemProps[] = [
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
];
