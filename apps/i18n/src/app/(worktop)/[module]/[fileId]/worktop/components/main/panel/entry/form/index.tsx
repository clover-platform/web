import { type CreateEntryFormData, getSchema } from '@/config/pages/entry/form'
import { Form, FormItem, Input, Textarea } from '@easykit/design'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { MultiFileSelect } from '../../../../select/multi-file'
export interface EntryFormProps extends PropsWithChildren {
  onSubmit?: (data: CreateEntryFormData) => void
  defaultValues?: CreateEntryFormData
}

export const EntryForm: FC<EntryFormProps> = (props) => {
  const { defaultValues = {} } = props
  const { t } = useTranslation()

  return (
    <Form<CreateEntryFormData> schema={getSchema()} onSubmit={props.onSubmit} defaultValues={defaultValues}>
      <FormItem name="value" label={t('词条')}>
        <Textarea placeholder={t('请输入原始语言词条')} />
      </FormItem>
      <FormItem name="key" label={t('唯一标识')}>
        <Input placeholder={t('请输入唯一标识')} />
      </FormItem>
      <FormItem name="context" label={t('上下文')}>
        <Textarea placeholder={t('请输入上下文，以描述词条的语境')} />
      </FormItem>
      <FormItem name="files" label={t('分支')}>
        <MultiFileSelect />
      </FormItem>
      {props.children}
    </Form>
  )
}
