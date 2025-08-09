import { RenameDialog } from './dialog/rename'
import { UpdateDialog } from './dialog/update'
import { getColumns, getFilters, getRowActions } from './table'

import { useState } from 'react'
import { Card, DataTable, useAlert, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useListQuery } from '@clover/public/hooks'
import { deleteFile, type ListFileQuery, list } from '@/rest/source'
import type { File } from '@/types/module/source'

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
    initialParams,
    key: 'module:source:files',
    action: list,
  })
  const [renameVisible, setRenameVisible] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const queryClient = useQueryClient()

  const { mutateAsync: deleteFileMutate } = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries({ queryKey: ['module:list'], exact: false })
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  return (
    <>
      <Card>
        <DataTable<File>
          columns={getColumns()}
          data={data}
          filter={{
            items: getFilters(),
            defaultValues: initialParams,
            query: query,
          }}
          inCard={true}
          load={load}
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
            } else if (key === 'rename') {
              setRenameVisible(true)
              setFile(original)
            } else if (key === 'update') {
              setUpdateVisible(true)
              setFile(original)
            }
          }}
          pagination={pagination}
          rowActions={(cell) => getRowActions(cell)}
        />
      </Card>
      <RenameDialog
        fileId={file?.id}
        fileName={file?.name}
        onCancel={() => {
          setRenameVisible(false)
          setFile(null)
        }}
        visible={renameVisible}
      />
      <UpdateDialog
        fileId={file?.id}
        fileName={file?.name}
        onCancel={() => {
          setUpdateVisible(false)
          setFile(null)
        }}
        visible={updateVisible}
      />
    </>
  )
}
