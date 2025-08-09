import type { DataTableColumn, DropdownMenuItemProps } from '@easykit/design'
import { t } from '@clover/public/utils/locale.client'
import type { AccessToken } from '@/types/profile/access/token'

export const getColumns = (): DataTableColumn<AccessToken>[] => [
  {
    accessorKey: 'name',
    header: t('令牌名称'),
    enableHiding: false,
    className: 'min-w-[200px]',
  },
  {
    accessorKey: 'createTime',
    header: t('创建时间'),
    enableHiding: true,
    className: '!w-[200px]',
    formatters: ['time'],
  },
  {
    accessorKey: 'expirationTime',
    header: t('过期时间'),
    enableHiding: true,
    className: '!w-[200px]',
    formatters: ['time'],
  },
]

export const getRowActions = (_row: AccessToken): DropdownMenuItemProps[] => {
  return [
    {
      id: 'revoke',
      type: 'item',
      label: t('撤销'),
    },
  ]
}
