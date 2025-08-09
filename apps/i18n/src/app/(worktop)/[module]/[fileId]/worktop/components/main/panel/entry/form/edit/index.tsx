import type { FC, PropsWithChildren } from 'react'
import { Form, FormItem } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import TextareaAutosize from 'react-textarea-autosize'
import { type EntryEditFormData, getSchema } from '@/config/pages/entry/edit/form'
export interface EntryEditFormProps extends PropsWithChildren {
  onSubmit?: (data: EntryEditFormData) => void
  defaultValues?: EntryEditFormData
}

export const EntryEditForm: FC<EntryEditFormProps> = (props) => {
  const { defaultValues = {} } = props
  const { t } = useTranslation()

  return (
    <Form<EntryEditFormData> defaultValues={defaultValues} onSubmit={props.onSubmit} schema={getSchema()}>
      <FormItem label={t('原文')} name="value">
        <TextareaAutosize className="w-full rounded-md border p-2" minRows={3} placeholder={t('请输入原始语言词条')} />
      </FormItem>
      <FormItem label={t('上下文')} name="context">
        <TextareaAutosize className="w-full rounded-md border p-2" minRows={3} placeholder={t('请输入上下文')} />
      </FormItem>
      {props.children}
    </Form>
  )
}
