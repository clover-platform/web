import { type FC, useMemo } from 'react'
import { Alert, Button, Dialog, type DialogProps, Space, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Info } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import type { FileFormData } from '@/config/schema/module/file'
import { updateBatch } from '@/rest/source'

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

  const errorFiles = useMemo(() => {
    return files.filter((file) => file.error === 'not_imported')
  }, [files])

  const repeatedFiles = useMemo(() => {
    return files.filter((file) => file.error === 'repeated')
  }, [files])

  return (
    <Dialog {...props} maskClosable={false} title={t('文件重复')}>
      {errorFiles.length > 0 && (
        <Alert className="mb-4" icon={<Info />} title={t('上传失败')} variant="destructive">
          <div>{t('以下文件上传失败，请重新上传')}</div>
          <ul className="ml-2 list-disc">
            {errorFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </Alert>
      )}
      {repeatedFiles.length > 0 && (
        <Alert className="mb-4" icon={<Info />} title={t('重复提示')}>
          <div>{t('以下文件重复，是否更新？')}</div>
          <ul className="ml-2 list-disc">
            {repeatedFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </Alert>
      )}
      <Space className="justify-end">
        <Button
          loading={loading}
          onClick={() => mutate({ module: module as string, files: files.filter((file) => file.error === 'repeated') })}
          type="button"
        >
          {t('更新')}
        </Button>
        <Button onClick={() => props.onCancel?.()} type="button" variant="outline">
          {t('取消')}
        </Button>
      </Space>
    </Dialog>
  )
}
