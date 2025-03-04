import {DropdownMenuItemProps, FilterItemProps, Input} from "@easykit/design";
import {t} from "@clover/public/locale";
import {DataTableColumn} from "@easykit/design/components/uix/data-table";
import {TabsTitleItem} from "@clover/public/components/common/tabs-title";
import {Team} from "@clover/public/types/team";
import {UserItem} from "@clover/public/components/common/user-item";

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
    className: "min-w-[200px]",
    cell: ({row}) => {
      const { original } = row;
      return <span>
        <span>{original.name}</span>
        <span className={"ml-1 text-secondary-foreground/60"}>@{original.teamKey}</span>
      </span>
    }
  },
  {
    accessorKey: "owner",
    header: t("所有者"),
    enableHiding: false,
    className: "w-[200px] min-w-[200px]",
    cell: ({row}) => {
      const { original } = row;
      return <UserItem info={original.owner} />
    }
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

enum MemberType {
  Owner = 2,
  Admin = 1,
  Member = 0,
}

export const getRowActions = (row: Team): DropdownMenuItemProps[] => {
  return [
    {
      id: "info",
      type: "item",
      label: t("详情")
    },
    {
      id: "member",
      type: "item",
      label: t("成员")
    },
    row.isCollect ? {
      id: "collect.cancel",
      type: "item",
      label: t("取消收藏")
    }: {
      id: "collect",
      type: "item",
      label: t("收藏")
    },
    {
      id: "separator.1",
      type: "separator"
    },
    [MemberType.Member, MemberType.Admin].includes(row.memberType) && {
      id: "exit",
      type: "item",
      label: t("退出")
    },
    row.memberType === MemberType.Owner && {
      id: "delete",
      type: "item",
      label: t("删除")
    },
  ].filter(Boolean) as DropdownMenuItemProps[];
};
