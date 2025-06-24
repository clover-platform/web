import { type FileFormData, getSchema } from '@/config/schema/module/file'
import { type UploadFileData, update } from '@/rest/source'
import { Uploader } from '@clover/public/components/common/uploader'
import { Alert, Button, Dialog, type DialogProps, Form, FormItem, Space, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Info } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export type UpdateDialogProps = {
  fileId?: number
  fileName?: string
} & DialogProps

export const UpdateDialog: FC<UpdateDialogProps> = (props) => {
  const { fileId, fileName } = props
  const { module } = useParams()
  const msg = useMessage()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { mutate, isPending: loading } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['module:source:files'] })
      props.onCancel?.()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const onSubmit = (data: UploadFileData) => {
    data.module = module as string
    data.fileId = fileId
    mutate(data)
  }

  const accept = useMemo((): Record<string, string[]> | undefined => {
    if (fileName?.endsWith('.json')) {
      return {
        'application/json': ['.json'],
      }
    }
    if (fileName?.endsWith('.xls') || fileName?.endsWith('.xlsx')) {
      return {
        'application/vnd.*': ['.xls', '.xlsx'],
      }
    }
    return undefined
  }, [fileName])

  return (
    <Dialog {...props} title={t('更新文件')} maskClosable={false}>
      <Alert className="mb-4" title={t('文件说明')} icon={<Info />}>
        <ul className="ml-2 list-disc">
          <li>{t('你需要与原文件（{{fileName}}）格式保持一致。', { fileName: fileName || '' })}</li>
          <li>{t('更新文件时，只能上传 1 个文件。')}</li>
        </ul>
      </Alert>
      <Form<FileFormData> schema={getSchema()} onSubmit={(data) => onSubmit(data as UploadFileData)}>
        <FormItem name="files">
          <Uploader
            maxFiles={1}
            accept={accept}
            data={{
              type: 1, // 私有
            }}
          />
        </FormItem>
        <Space className="justify-end">
          <Button loading={loading} type="submit">
            {t('提交')}
          </Button>
          <Button variant="outline" type="button" onClick={() => props.onCancel?.()}>
            {t('取消')}
          </Button>
        </Space>
      </Form>
    </Dialog>
  )
}
