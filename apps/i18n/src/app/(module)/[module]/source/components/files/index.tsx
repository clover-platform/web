
import { type ListFileQuery, deleteFile, list } from '@/rest/source'
import type { File } from '@/types/module/file'
import { useListQuery } from '@clover/public/hooks'
import { Card, DataTable, useAlert, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { ROW_ACTIONS, getColumns, getFilters } from './table'

const initialParams = {
  keyword: '',
}

export const Files = () => {
  const { module } = useParams()
  const alert = useAlert()
  const msg = useMessage()
  const { t } = useTranslation()
  const { loading, data, pagination, load, query, refetch } = useListQuery<File, ListFileQuery>({
    params: {
      module: module as string,
    },
    key: 'module:source:files',
    action: list,
  })

  const { mutateAsync: deleteFileMutate } = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      refetch().then()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  return (
    <>
      <Card>
        <DataTable<File>
          inCard={true}
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
                title: t('删除'),
                description: t('确认删除文件'),
                onOk: async () => {
                  await deleteFileMutate({
                    module: module as string,
                    fileId: original.id,
                  })
                  return true
                },
              })
            }
          }}
        />
      </Card>
    </>
  )
}