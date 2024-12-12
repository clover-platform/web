import {DropdownMenuItemProps, FilterItemProps, Input} from "@easykit/design";
import {t} from "@clover/public/locale";
import {DataTableColumn} from "@easykit/design/components/uix/data-table";
import {Project} from "@/types/project";

export const getColumns = (): DataTableColumn<Project>[] => [
    {
        accessorKey: "name",
        header: t("名称"),
        enableHiding: false,
        className: "w-[300px] min-w-[200px]"
    },
]

export const getFilters = (): FilterItemProps[] => [
    {
        field: 'keyword',
        render: () => <Input placeholder={t("请输入关键词")}/>,
    },
    {
        field: 'teamId',
        label: t("所属团队"),
        render: () => <Input placeholder={t("请输入关键词")}/>,
    },
]

export const getRowActions = (row: Project): DropdownMenuItemProps[] => {
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
    ];
};
