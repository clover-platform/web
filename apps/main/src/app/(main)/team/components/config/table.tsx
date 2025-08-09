import { IconTeam } from '@arco-iconbox/react-clover'
import { Badge, type DataTableColumn, type DropdownMenuItemProps, type FilterItemProps, Input } from '@easykit/design'
import type { TabsTitleItem } from '@clover/public/components/common/tabs-title'
import { UserItem } from '@clover/public/components/common/user-item'
import type { Team } from '@clover/public/types/team'
import { t } from '@clover/public/utils/locale.client'

export const getTabs = (): TabsTitleItem[] => [
  {
    id: 'all',
    title: t('全部'),
  },
  {
    id: 'create',
    title: t('由我创建'),
  },
  {
    id: 'join',
    title: t('我加入的'),
  },
]

export const getColumns = (currentTeamId?: number): DataTableColumn<Team>[] => [
  {
    accessorKey: 'name',
    header: t('名称'),
    enableHiding: false,
    className: 'w-[300px] min-w-[300px]',
    cell: ({ row }) => {
      const { original } = row
      return (
        <div className="flex items-center space-x-1">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
            {original.cover ? (
              // biome-ignore lint/performance/noImgElement: Cover
              <img alt="Cover" className="h-full w-full object-cover" src={original.cover} />
            ) : (
              <IconTeam />
            )}
          </div>
          <div>
            <span>{original.name}</span>
            <span className="ml-1 text-secondary-foreground/60">@{original.teamKey}</span>
          </div>
          {original.id === currentTeamId ? <Badge>{t('当前')}</Badge> : null}
        </div>
      )
    },
  },
  {
    accessorKey: 'owner',
    header: t('所有者'),
    enableHiding: false,
    className: 'w-[200px] min-w-[200px]',
    cell: ({ row }) => {
      const { original } = row
      return <UserItem info={original.owner} />
    },
  },
  {
    accessorKey: 'createTime',
    header: t('创建时间'),
    enableHiding: false,
    formatters: ['time'],
    className: 'w-[200px] min-w-[200px]',
  },
]

export const getFilters = (): FilterItemProps[] => [
  {
    field: 'keyword',
    render: () => <Input placeholder={t('请输入关键词')} />,
  },
]

enum MemberType {
  Owner = 2,
  Admin = 1,
  Member = 0,
}

export const getRowActions = (team: Team, currentTeamId?: number): DropdownMenuItemProps[] => {
  return [
    {
      id: 'info',
      type: 'item',
      label: t('详情'),
    },
    {
      id: 'member',
      type: 'item',
      label: t('成员'),
    },
    team.isCollect
      ? {
          id: 'collect.cancel',
          type: 'item',
          label: t('取消收藏'),
        }
      : {
          id: 'collect',
          type: 'item',
          label: t('收藏'),
        },
    team.id !== currentTeamId && {
      id: 'separator.1',
      type: 'separator',
    },
    [MemberType.Member, MemberType.Admin].includes(team.memberType) &&
      team.id !== currentTeamId && {
        id: 'leave',
        type: 'item',
        label: t('退出'),
      },
    team.memberType === MemberType.Owner &&
      team.id !== currentTeamId && {
        id: 'delete',
        type: 'item',
        label: t('删除'),
      },
  ].filter(Boolean) as DropdownMenuItemProps[]
}
