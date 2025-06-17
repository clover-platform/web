import type { File } from '@/types/module/file'
import { t } from '@clover/public/utils/locale.client'
import type { DataTableColumn } from '@easykit/design'
import { type DropdownMenuItemProps, type FilterItemProps, Input } from '@easykit/design'

export const getColumns = (): DataTableColumn<File>[] => [
  {
    accessorKey: 'name',
    header: t('名称'),
    enableHiding: false,
    className: 'min-w-[200px]',
  },
  {
    accessorKey: 'updateTime',
    header: t('最后更新'),
    enableHiding: false,
    formatters: ['time'],
    className: '!w-[200px]',
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
      id: 'rename',
      type: 'item',
      label: t('重命名'),
    },
  ]
  items.push({
    id: 'delete',
    type: 'item',
    label: t('删除'),
  })
  return items
}
