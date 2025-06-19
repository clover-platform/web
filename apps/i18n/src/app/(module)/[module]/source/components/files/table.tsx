import type { File } from '@/types/module/file'
import { t } from '@clover/public/utils/locale.client'
import type { DataTableColumn } from '@easykit/design'
import { type DropdownMenuItemProps, type FilterItemProps, Input } from '@easykit/design'
import { FileRevision } from './revision'

export const getColumns = (): DataTableColumn<File>[] => [
  {
    accessorKey: 'name',
    header: t('名称'),
    enableHiding: false,
    className: 'min-w-[200px]',
  },
  {
    accessorKey: 'wordCount',
    header: () => <div className="text-right">{t('字数')}</div>,
    className: 'w-[100px] min-w-[100px]',
    cell: () => {
      return <div className="text-right">{100}</div>
    },
  },
  {
    accessorKey: 'revision',
    header: () => <div className="text-center">{t('变更')}</div>,
    className: 'w-[100px] min-w-[100px]',
    cell: ({ row }) => <FileRevision version={1} fileId={row.original.id} />,
  },
  {
    accessorKey: 'updateTime',
    header: t('最后更新'),
    formatters: ['time'],
    className: 'w-[180px] min-w-[180px]',
  },
]

export const getFilters = (): FilterItemProps[] => [
  {
    field: 'keyword',
    render: () => <Input placeholder={t('请输入关键词')} />,
  },
]

export const ROW_ACTIONS = (_cell: File): DropdownMenuItemProps[] => {
  const items: DropdownMenuItemProps[] = [
    {
      id: 'update',
      type: 'item',
      label: t('更新'),
    },
    {
      id: 'rename',
      type: 'item',
      label: t('重命名'),
    },
    {
      id: 'delete',
      type: 'item',
      label: t('删除'),
    },
  ]
  return items
}
