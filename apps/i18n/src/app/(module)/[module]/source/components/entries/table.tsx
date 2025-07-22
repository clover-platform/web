import { FileName } from '@/components/common/file-name'
import type { Entry } from '@/types/module/entry'
import { t } from '@clover/public/utils/locale.client'
import { type DataTableColumn, type DropdownMenuItemProps, type FilterItemProps, Input } from '@easykit/design'
import { FilesSelect } from './select/files'

export const getColumns = (): DataTableColumn<Entry>[] => [
  {
    accessorKey: 'file',
    header: t('所属文件'),
    enableHiding: false,
    className: 'min-w-[200px]',
    cell: ({ row }) => <FileName file={row.original.file!} />,
  },
  {
    accessorKey: 'identifier',
    header: t('标识符'),
    className: 'w-[180px] min-w-[180px]',
  },
  {
    accessorKey: 'value',
    header: t('词条'),
    className: 'w-[280px] min-w-[280px]',
  },
  {
    accessorKey: 'context',
    header: t('上下文'),
    formatters: ['defaultValue'],
    className: 'w-[280px] min-w-[280px]',
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
  {
    field: 'fileId',
    label: t('所属文件'),
    render: () => <FilesSelect />,
  },
]

export const getRowActions = (_cell: Entry): DropdownMenuItemProps[] => {
  const items: DropdownMenuItemProps[] = [
    {
      id: 'update',
      type: 'item',
      label: t('编辑'),
    },
    {
      id: 'delete',
      type: 'item',
      label: t('删除'),
    },
  ]
  return items
}
