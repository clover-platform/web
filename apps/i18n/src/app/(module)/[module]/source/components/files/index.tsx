import { deleteBranch } from '@/rest/branch'
import { type ListFileQuery, list } from '@/rest/source'
import type { File } from '@/types/module/file'
import { useListQuery } from '@clover/public/hooks'
import { Card, DataTable, useAlert, useMessage } from '@easykit/design'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ROW_ACTIONS, getColumns, getFilters } from './table'

const initialParams = {
  keyword: '',
}

export const Files = () => {
  const { module } = useParams()
  const alert = useAlert()
  const msg = useMessage()
  const [renameVisible, setRenameVisible] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [mergeVisible, setMergeVisible] = useState(false)
  const { t } = useTranslation()
  const { loading, data, pagination, load, query, refetch } = useListQuery<File, ListFileQuery>({
    params: {
      module: module as string,
    },
    key: 'module:source:files',
    action: list,
  })

  return (
    <>
      <Card>
        <DataTable<File>
          filter={{
            items: getFilters(),
            defaultValues: initialParams,
            query: query,
          }}
          load={load}
          pagination={pagination}
          columns={getColumns()}
          rowActions={(cell) => ROW_ACTIONS(cell)}
          data={data}
          loading={loading}
          onRowActionClick={({ id: key }, { original }) => {
            if (key === 'delete') {
              alert.confirm({
                title: t('删除分支'),
                description: t('确认删除分支'),
                onOk: async () => {
                  const { success, message } = await deleteBranch({
                    id: original.id,
                    module: module as string,
                  })
                  if (success) {
                    refetch().then()
                  } else {
                    msg.error(message)
                  }
                  return success
                },
              })
            } else if (key === 'rename') {
              setFile(original)
              setRenameVisible(true)
            } else if (key === 'merge') {
              setFile(original)
              setMergeVisible(true)
            }
          }}
        />
      </Card>
    </>
  )
}