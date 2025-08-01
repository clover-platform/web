import { FileName } from '@/components/common/file-name'
import type { File } from '@/types/module/source'
import { t } from '@clover/public/utils/locale.client'
import type { DataTableColumn } from '@easykit/design'
import { type DropdownMenuItemProps, type FilterItemProps, Input } from '@easykit/design'
import { FileRevision } from './common/revision'
import { WordCount } from './common/word-count'

export const getColumns = (): DataTableColumn<File>[] => [
  {
    accessorKey: 'name',
    header: t('名称'),
    enableHiding: false,
    className: 'min-w-[200px]',
    cell: ({ row }) => <FileName file={row.original} />,
  },
  {
    accessorKey: 'wordCount',
    header: () => <div className="text-right">{t('词条')}</div>,
    className: 'w-[100px] min-w-[100px]',
    cell: ({ row }) => (
      <WordCount
        wordCount={row.original.wordCount}
        fileId={row.original.id}
        revisionVersion={row.original.revisionVersion}
        importStatus={row.original.importStatus}
      />
    ),
  },
  {
    accessorKey: 'revision',
    header: () => <div className="text-center">{t('变更')}</div>,
    className: 'w-[100px] min-w-[100px]',
    cell: ({ row }) =>
      row.original.importStatus === 1 ? (
        <FileRevision version={row.original.revisionVersion} fileId={row.original.id} />
      ) : (
        <div className="text-center">--</div>
      ),
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

export const getRowActions = (_cell: File): DropdownMenuItemProps[] => {
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
