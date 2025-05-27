import type { Module } from '@/types/pages/module'
import type { Account } from '@clover/public/types/account'
import { i18n, t } from '@clover/public/utils/locale.client'
import type { DataTableColumn } from '@easykit/design'
import { type DropdownMenuItemProps, type FilterItemProps, Input } from '@easykit/design'
import TimeAgo from 'javascript-time-ago'

export const getColumns = (): DataTableColumn<Module>[] => [
  {
    accessorKey: 'name',
    header: t('名称'),
    enableHiding: false,
    className: 'w-[300px] min-w-[200px]',
    cell: (cell) => {
      const timeAgo = new TimeAgo(t('LANG'))
      const data = cell.row.original
      const { name, updateTime, memberSize } = data
      const time = i18n(t('更新于%time'), {
        time: timeAgo.format(new Date(updateTime!)),
      })
      const member = i18n(t('成员%size'), {
        size: memberSize,
      })
      return (
        <div>
          <div className="font-medium text-base">{name}</div>
          <div className="text-muted-foreground text-xs">
            {time} · {member}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'sourceSize',
    header: t('词条数'),
    enableHiding: false,
    className: 'min-w-[150px]',
    cell: (cell) => {
      const data = cell.row.original
      const { wordSize = 0 } = data
      return (
        <div>
          <div className="font-medium text-base">{wordSize}</div>
          <div className="text-muted-foreground text-xs">{t('词条数')}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'targetSize',
    header: t('语言'),
    enableHiding: false,
    className: 'min-w-[150px]',
    cell: (cell) => {
      const data = cell.row.original
      const { targetSize } = data
      return (
        <div>
          <div className="font-medium text-base">{targetSize}</div>
          <div className="text-muted-foreground text-xs">{t('目标语言')}</div>
        </div>
      )
    },
  },
]

export const getFilters = (): FilterItemProps[] => [
  {
    field: 'keyword',
    render: () => <Input placeholder={t('请输入关键词')} />,
  },
]

export const ROW_ACTIONS = (profile: Account, row: Module): DropdownMenuItemProps[] => {
  return [
    {
      id: 'detail',
      type: 'item',
      label: t('详情'),
    },
    {
      id: 'activity',
      type: 'item',
      label: t('动态'),
    },
    {
      type: 'separator',
      id: 'separator.1',
      hidden: row.owner !== profile.id,
    },
    {
      id: 'delete',
      type: 'item',
      label: t('删除'),
      hidden: row.owner !== profile.id,
    },
  ]
}
