import { type FileFormData, getSchema } from '@/config/schema/module/file'
import { type UploadFileData, upload } from '@/rest/source'
import { Uploader } from '@clover/public/components/common/uploader'
import { Alert, Button, Dialog, type DialogProps, Form, FormItem, Space, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Info } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UpdateBatchDialog } from '../update-batch'

export type UploadDialogProps = DialogProps

export const UploadDialog: FC<UploadDialogProps> = (props) => {
  const { module } = useParams()
  const msg = useMessage()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [files, setFiles] = useState<FileFormData['files']>([])
  const [visible, setVisible] = useState(false)
  const { mutate, isPending: loading } = useMutation({
    mutationFn: upload,
    onSuccess: (data) => {
      const { files = [] } = data || {}
      const errorFiles = files.filter((file) => !file.success)
      if (errorFiles.length > 0) {
        setFiles(errorFiles)
        setVisible(true)
      }
      props.onCancel?.()
      queryClient.invalidateQueries({ queryKey: ['module:source:files'] })
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const onSubmit = (data: UploadFileData) => {
    data.module = module as string
    mutate(data)
  }

  const json = {
    key: 'value',
  }

  return (
    <>
      <Dialog {...props} title={t('上传文件')} maskClosable={false}>
        <Alert className="mb-4" title={t('文件说明')} icon={<Info />}>
          <ul className="ml-2 list-disc">
            <li>{t('JSON 文件需要使用 {{json}} 格式', { json: JSON.stringify(json) })}</li>
            <li>{t('Excel 上传成功后，你需要手动配置导入的数据列，你的工作表至少有两列。')}</li>
            <li>{t('上传文件数量不能超过 3 个。')}</li>
          </ul>
        </Alert>
        <Form<FileFormData> schema={getSchema()} onSubmit={(data) => onSubmit(data as UploadFileData)}>
          <FormItem name="files">
            <Uploader
              maxFiles={3}
              accept={{
                'application/json': ['.json'],
                'application/vnd.*': ['.xls', '.xlsx'],
              }}
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
      <UpdateBatchDialog
        files={files}
        visible={visible}
        onCancel={() => {
          setVisible(false)
          setFiles([])
        }}
      />
    </>
  )
}
