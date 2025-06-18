import { type CreateBranchData, create } from '@/rest/branch'
import { Button, Dialog, type DialogProps, Space, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ModuleFileForm } from '../../form'

export type NewBranchModalProps = {
  onSuccess?: () => void
} & DialogProps

export const NewBranchModal: FC<NewBranchModalProps> = (props) => {
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

  return (
    <Dialog {...props} title={t('上传文件')} maskClosable={false}>
      <ModuleFileForm onSubmit={(data) => onSubmit(data as CreateBranchData)}>
        <Space className="justify-end">
          <Button loading={loading} type="submit">
            {t('提交')}
          </Button>
          <Button variant="outline" type="button" onClick={() => props.onCancel?.()}>
            {t('取消')}
          </Button>
        </Space>
      </ModuleFileForm>
    </Dialog>
  )
}
