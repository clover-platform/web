import { type FileFormData, getSchema } from '@/config/schema/module/file'
import { type CreateBranchData, create } from '@/rest/branch'
import { uploadHandle } from '@clover/public/utils/file'
import { Alert, Button, Dialog, type DialogProps, Form, FormItem, Space, Uploader, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { Info } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

export type UploadModalProps = {
  onSuccess?: () => void
} & DialogProps

export const UploadModal: FC<UploadModalProps> = (props) => {
  const { module } = useParams()
  const msg = useMessage()
  const { t } = useTranslation()
  const { mutate, isPending: loading } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      props.onSuccess?.()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const onSubmit = (data: CreateBranchData) => {
    data.module = module as string
    mutate(data)
  }

  const json = {
    key: 'value',
  }

  return (
    <Dialog {...props} title={t('上传文件')} maskClosable={false}>
      <Alert className="mb-4" title={t('上传文件说明')} icon={<Info />}>
        <ul className="ml-2 list-disc">
          <li>{t('JSON 文件需要使用 {{json}} 格式', { json: JSON.stringify(json) })}</li>
          <li>{t('Excel 上传成功后，你需要手动配置导入的数据列，你的工作表至少有两列。')}</li>
          <li>{t('上传文件数量不能超过 3 个。')}</li>
        </ul>
      </Alert>
      <Form<FileFormData> schema={getSchema()} onSubmit={(data) => onSubmit(data as CreateBranchData)}>
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
            uploadHandle={uploadHandle}
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
