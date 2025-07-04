import type { Bundle } from '@/types/module/bundle'
import { t } from '@clover/public/utils/locale.client'
import type { DataTableColumn } from '@easykit/design'
import type { DropdownMenuItemProps } from '@easykit/design'
import { BundleFormat } from './format'

export const getColumns = (): DataTableColumn<Bundle>[] => [
  {
    accessorKey: 'name',
    header: t('产物名'),
    enableHiding: false,
    className: 'min-w-[200px]',
  },
  {
    accessorKey: 'sources',
    header: t('分支'),
    enableHiding: false,
    className: '!w-[200px]',
    formatters: ['join'],
  },
  {
    accessorKey: 'export',
    header: t('导出格式'),
    enableHiding: false,
    className: '!w-[200px]',
    cell: (cell) => {
      const { format } = cell.row.original
      return <BundleFormat value={format} />
    },
  },
  {
    accessorKey: 'createTime',
    header: t('创建时间'),
    enableHiding: false,
    formatters: ['time'],
    className: '!w-[200px]',
  },
]

export const getRowActions = (): DropdownMenuItemProps[] => [
  {
    id: 'download',
    type: 'item',
    label: t('下载'),
  },
  {
    id: 'delete',
    type: 'item',
    label: t('删除'),
  },
]
