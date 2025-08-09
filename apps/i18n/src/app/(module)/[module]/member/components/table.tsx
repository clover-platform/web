import { MemberRole } from './role'

import type { DataTableColumn } from '@easykit/design'
import { type DropdownMenuItemProps, type FilterItemProps, Input } from '@easykit/design'
import { t } from '@clover/public/utils/locale.client'
import type { Member } from '@/types/module/member'

export const getFilters = (): FilterItemProps[] => [
  {
    field: 'keyword',
    render: () => <Input placeholder={t('请输入关键词')} />,
  },
]

export const getColumns = (): DataTableColumn<Member>[] => [
  {
    accessorKey: 'user.username',
    header: t('名称'),
    enableHiding: false,
    className: 'w-[200px] min-w-[200px]',
  },
  {
    accessorKey: 'user.email',
    header: t('邮箱'),
    className: 'min-w-[200px]',
  },
  {
    accessorKey: 'type',
    header: t('角色'),
    enableHiding: false,
    className: 'w-[200px] min-w-[200px]',
    cell: (cell) => {
      const data = cell.row.original
      return (
        <div className="space-x-2">
          {data.roles?.map((role) => (
            <MemberRole key={role} value={role} />
          ))}
        </div>
      )
    },
  },
]

export const getRowActions = (): DropdownMenuItemProps[] => [
  {
    id: 'detail',
    type: 'item',
    label: t('详情'),
  },
]
