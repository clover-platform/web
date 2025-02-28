import {DropdownMenuItemProps, FilterItemProps, Input} from "@easykit/design";
import {t} from "@clover/public/locale";
import {DataTableColumn} from "@easykit/design/components/uix/data-table";
import {TabsTitleItem} from "@clover/public/components/common/tabs-title";
import {Team} from "@clover/public/types/team";

export const getTabs = (): TabsTitleItem[] => [
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

export const getColumns = (): DataTableColumn<Team>[] => [
  {
    accessorKey: "name",
    header: t("名称"),
    enableHiding: false,
    className: "min-w-[200px]"
  },
  {
    accessorKey: "teamKey",
    header: t("唯一标识"),
    enableHiding: false,
    className: "w-[200px] min-w-[200px]"
  },
  {
    accessorKey: "createTime",
    header: t("创建时间"),
    enableHiding: false,
    formatters: ["time"],
    className: "w-[200px] min-w-[200px]"
  }
]

export const getFilters = (): FilterItemProps[] => [
  {
    field: 'keyword',
    render: () => <Input placeholder={t("请输入关键词")}/>,
  },
]

export const getRowActions = (row: Team): DropdownMenuItemProps[] => {
  console.log(row);
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
