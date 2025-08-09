import { MultiFileSelect } from '../../../../select/multi-file'

import type { FC, PropsWithChildren } from 'react'
import { Form, FormItem, Input, Textarea } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { type CreateEntryFormData, getSchema } from '@/config/pages/entry/form'
export interface EntryFormProps extends PropsWithChildren {
  onSubmit?: (data: CreateEntryFormData) => void
  defaultValues?: CreateEntryFormData
}

export const EntryForm: FC<EntryFormProps> = (props) => {
  const { defaultValues = {} } = props
  const { t } = useTranslation()

  return (
    <Form<CreateEntryFormData> defaultValues={defaultValues} onSubmit={props.onSubmit} schema={getSchema()}>
      <FormItem label={t('词条')} name="value">
        <Textarea placeholder={t('请输入原始语言词条')} />
      </FormItem>
      <FormItem label={t('唯一标识')} name="key">
        <Input placeholder={t('请输入唯一标识')} />
      </FormItem>
      <FormItem label={t('上下文')} name="context">
        <Textarea placeholder={t('请输入上下文，以描述词条的语境')} />
      </FormItem>
      <FormItem label={t('分支')} name="files">
        <MultiFileSelect />
      </FormItem>
      {props.children}
    </Form>
  )
}
