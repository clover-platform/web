import type { FileFormData } from '@/config/schema/module/file'
import { updateBatch } from '@/rest/source'
import { Alert, Button, Dialog, type DialogProps, Space, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Info } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

export type UpdateBatchDialogProps = DialogProps & {
  files: FileFormData['files']
}

export const UpdateBatchDialog: FC<UpdateBatchDialogProps> = (props) => {
  const { files } = props
  const { t } = useTranslation()
  const { module } = useParams()
  const msg = useMessage()
  const queryClient = useQueryClient()
  const { mutate, isPending: loading } = useMutation({
    mutationFn: updateBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['module:source:files'] })
      props.onCancel?.()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  return (
    <Dialog {...props} title={t('文件重复')} maskClosable={false}>
      <Alert className="mb-4" title={t('重复提示')} icon={<Info />}>
        <div>{t('以下文件重复，是否更新？')}</div>
        <ul className="ml-2 list-disc">
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </Alert>
      <Space className="justify-end">
        <Button loading={loading} type="button" onClick={() => mutate({ module: module as string, files })}>
          {t('更新')}
        </Button>
        <Button variant="outline" type="button" onClick={() => props.onCancel?.()}>
          {t('取消')}
        </Button>
      </Space>
    </Dialog>
  )
}