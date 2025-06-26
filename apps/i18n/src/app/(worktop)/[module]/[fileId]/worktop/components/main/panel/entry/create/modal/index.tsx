import { create } from '@/rest/entry'
import { Button, Checkbox, Dialog, type DialogProps, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EntryForm } from '../../form'
export type CreateEntryModalProps = {
  onSuccess?: (close?: boolean) => void
} & DialogProps

export const CreateEntryModal: FC<CreateEntryModalProps> = (props) => {
  const { t } = useTranslation()
  const { module } = useParams()
  const [close, setClose] = useState(true)
  const msg = useMessage()
  const [formKey, setFormKey] = useState(Date.now())
  const { mutate: onSubmit, isPending: loading } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      props.onSuccess?.(close)
      setFormKey(Date.now())
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  useEffect(() => {
    if (props.visible) setFormKey(Date.now())
  }, [props.visible])

  return (
    <Dialog {...props} title={t('新增词条')} maskClosable={false}>
      <EntryForm key={formKey} onSubmit={(data) => onSubmit({ ...data, module: module as string })}>
        <div className="flex items-center justify-end space-x-2">
          <div className="flex items-center space-x-1">
            <Checkbox onCheckedChange={(checked) => setClose(!checked)} checked={!close} id="hold-entry-modal" />
            <label
              htmlFor="hold-entry-modal"
              className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('成功后不关闭窗口')}
            </label>
          </div>
          <Button loading={loading} type="submit">
            {t('提交')}
          </Button>
          <Button variant="outline" type="button" onClick={() => props.onCancel?.()}>
            {t('取消')}
          </Button>
        </div>
      </EntryForm>
    </Dialog>
  )
}
