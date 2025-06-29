import { type EditEntryData, edit } from '@/rest/entry'
import { filesState } from '@/state/worktop'
import type { Entry } from '@/types/module/entry'
import { Button, Dialog, type DialogProps, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai/index'
import { useParams } from 'next/navigation'
import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EntryEditForm } from '../../form/edit'

export type CreateEntryModalProps = {
  entry: Entry
  onSuccess?: () => void
} & DialogProps

export const EditEntryModal: FC<CreateEntryModalProps> = (props) => {
  const { entry } = props
  const msg = useMessage()
  const [formKey, setFormKey] = useState(Date.now())
  const { module } = useParams()
  const [files] = useAtom(filesState)
  const file = files.find((b) => b.id === entry?.fileId)
  const { t } = useTranslation()
  const { mutateAsync: editMutate, isPending: loading } = useMutation({
    mutationFn: edit,
    onSuccess: () => {
      props.onSuccess?.()
      setFormKey(Date.now())
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const onSubmit = async (data: EditEntryData) => {
    data.id = entry.id
    data.module = module as string
    if (!file) {
      msg.error(t('未找到对应文件'))
      return
    }
    data.fileId = file.id
    await editMutate(data)
  }

  useEffect(() => {
    if (props.visible) setFormKey(Date.now())
  }, [props.visible])

  return (
    <Dialog {...props} title={t('编辑词条')} maskClosable={false}>
      <EntryEditForm defaultValues={entry} key={formKey} onSubmit={(data) => onSubmit(data as EditEntryData)}>
        <div className="flex items-center justify-end space-x-2">
          <Button loading={loading} type="submit">
            {t('保存')}
          </Button>
          <Button variant="outline" type="button" onClick={() => props.onCancel?.()}>
            {t('取消')}
          </Button>
        </div>
      </EntryEditForm>
    </Dialog>
  )
}
