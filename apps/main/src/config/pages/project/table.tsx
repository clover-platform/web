import {Badge, DropdownMenuItemProps, FilterItemProps, Input, DataTableColumn} from "@easykit/design";
import {t} from "@clover/public/utils/locale.client";
import {TabsTitleItem} from "@clover/public/components/common/tabs-title";
import {Project} from "@clover/public/types/project";
import {TeamSelector} from "@clover/public/components/common/selector/team";
import {UserItem} from "@clover/public/components/common/user-item";
import {IconProject} from "@arco-iconbox/react-clover";
import React from "react";

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

export const getColumns = (current?: number): DataTableColumn<Project>[] => [
  {
    accessorKey: "name",
    header: t("名称"),
    enableHiding: false,
    className: "w-[300px] min-w-[300px]",
    cell: ({row}) => {
      const { original } = row;
      return <div className={"flex items-center space-x-1"}>
        <div className={"bg-secondary w-6 h-6 rounded-md flex justify-center items-center text-secondary-foreground"}>
          { original.cover ? <img className={"w-full h-full object-cover"} alt={"Cover"} src={original.cover}/> : <IconProject /> }
        </div>
        <div>
          <span>{original.name}</span>
          <span className={"ml-1 text-secondary-foreground/60"}>@{original.projectKey}</span>
        </div>
        { original.id === current ? <Badge>{t("当前")}</Badge> : null }
      </div>
    }
  },
  {
    accessorKey: "teamName",
    header: t("所属团队"),
    enableHiding: false,
    className: "w-[200px] min-w-[200px]",
    cell: ({row}) => {
      const { original } = row;
      const { team } = original;
      return <span>
        <span>{team.name}</span>
        <span className={"ml-1 text-secondary-foreground/60"}>@{team.teamKey}</span>
      </span>
    }
  },
  {
    accessorKey: "owner",
    header: t("所有者"),
    enableHiding: false,
    className: "w-[150px] min-w-[150px]",
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
  {
    field: 'teamId',
    label: t("所属团队"),
    render: () => <TeamSelector />,
  },
]

enum MemberType {
  Owner = 2,
  Admin = 1,
  Member = 0,
}

export const getRowActions = (project: Project, current?: number): DropdownMenuItemProps[] => {
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
    project.isCollect ? {
      id: "collect.cancel",
      type: "item",
      label: t("取消收藏")
    }: {
      id: "collect",
      type: "item",
      label: t("收藏")
    },
    project.id != current && {
      id: "separator.1",
      type: "separator"
    },
    ([MemberType.Member, MemberType.Admin].includes(project.memberType) && project.id != current) && {
      id: "exit",
      type: "item",
      label: t("退出")
    },
    (project.memberType === MemberType.Owner && project.id != current) && {
      id: "delete",
      type: "item",
      label: t("删除")
    },
  ].filter(Boolean) as DropdownMenuItemProps[];
};
