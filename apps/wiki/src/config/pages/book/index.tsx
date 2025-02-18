import {DataTableColumn} from "@easykit/design/components/uix/data-table";
import {DropdownMenuItemProps, FilterItemProps, Input} from "@easykit/design";
import {Book} from "@/types/pages/book";
import { t } from '@clover/public/locale';
import {TabsTitleItem} from "@clover/public/components/common/tabs-title";

export const getTabs = (): TabsTitleItem[] => {
    return [
        {
            id: "all",
            title: t("全部"),
        },
        {
            id: "create",
            title: t("由我创建"),
        },
        {
            id: "join",
            title: t("我加入的"),
        }
    ]
}

export const getColumns = (): DataTableColumn<Book>[] => {
    return [
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
    ]
}

export const getFilters = (): FilterItemProps[] => {
    return [
        {
            field: 'keyword',
            render: () => <Input placeholder={t("请输入关键词")}/>,
        },
    ]
}

export const getRowActions = (): DropdownMenuItemProps[] => {
    return [
        {
            id: "detail",
            type: "item",
            label: t("详情")
        },
        {
            id: "setting",
            type: "item",
            label: t("设置")
        },
        {
            id: "separator.1",
            type: "separator",
        },
        {
            id: "delete",
            type: "item",
            label: t("删除")
        },
    ];
}
