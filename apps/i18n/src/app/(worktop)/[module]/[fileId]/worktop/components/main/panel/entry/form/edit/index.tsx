import { type EntryEditFormData, getSchema } from '@/config/pages/entry/edit/form'
import { Form, FormItem } from '@easykit/design'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import TextareaAutosize from 'react-textarea-autosize'
export interface EntryEditFormProps extends PropsWithChildren {
  onSubmit?: (data: EntryEditFormData) => void
  defaultValues?: EntryEditFormData
}

export const EntryEditForm: FC<EntryEditFormProps> = (props) => {
  const {
    defaultValues = {}
  } = props;
  const { t } = useTranslation();

  return (
    <Form<EntryEditFormData> schema={getSchema()} onSubmit={props.onSubmit} defaultValues={defaultValues}>
      <FormItem name="value" label={t('原文')}>
        <TextareaAutosize minRows={3} placeholder={t('请输入原始语言词条')} className="w-full rounded-md border p-2" />
      </FormItem>
      <FormItem name="context" label={t('上下文')}>
        <TextareaAutosize minRows={3} placeholder={t('请输入上下文')} className="w-full rounded-md border p-2" />
      </FormItem>
      {props.children}
    </Form>
  )
}
