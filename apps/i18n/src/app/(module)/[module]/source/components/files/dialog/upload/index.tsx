import { UpdateBatchDialog } from '../update-batch'

import { type FC, useState } from 'react'
import { Alert, Button, Dialog, type DialogProps, Form, FormItem, Space, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Info } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Uploader } from '@clover/public/components/common/uploader'
import { type FileFormData, getSchema } from '@/config/schema/module/file'
import { type UploadFileData, upload } from '@/rest/source'

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
      queryClient.invalidateQueries({ queryKey: ['module:list'], exact: false })
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
      <Dialog {...props} maskClosable={false} title={t('上传文件')}>
        <Alert className="mb-4" icon={<Info />} title={t('文件说明')}>
          <ul className="ml-2 list-disc">
            <li>{t('JSON 文件需要使用 {{json}} 格式', { json: JSON.stringify(json) })}</li>
            <li>{t('Excel 上传成功后，你需要手动配置导入的数据列，你的工作表至少有两列。')}</li>
            <li>{t('上传文件数量不能超过 3 个。')}</li>
          </ul>
        </Alert>
        <Form<FileFormData> onSubmit={(data) => onSubmit(data as UploadFileData)} schema={getSchema()}>
          <FormItem name="files">
            <Uploader
              accept={{
                'application/json': ['.json'],
                'application/vnd.*': ['.xls', '.xlsx'],
              }}
              data={{
                type: 1, // 私有
              }}
              maxFiles={3}
            />
          </FormItem>
          <Space className="justify-end">
            <Button loading={loading} type="submit">
              {t('提交')}
            </Button>
            <Button onClick={() => props.onCancel?.()} type="button" variant="outline">
              {t('取消')}
            </Button>
          </Space>
        </Form>
      </Dialog>
      <UpdateBatchDialog
        files={files}
        onCancel={() => {
          setVisible(false)
          setFiles([])
        }}
        visible={visible}
      />
    </>
  )
}
