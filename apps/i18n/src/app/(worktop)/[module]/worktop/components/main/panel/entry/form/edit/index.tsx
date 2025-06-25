import { getSchema } from "@/config/pages/entry/edit/form";
import { Form, FormItem } from '@easykit/design'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import TextareaAutosize from 'react-textarea-autosize'
export interface EntryEditFormProps extends PropsWithChildren {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onSubmit?: (data: any) => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  defaultValues?: any
}

export const EntryEditForm: FC<EntryEditFormProps> = (props) => {
  const {
    defaultValues = {}
  } = props;
  const { t } = useTranslation();

  return (
    <Form schema={getSchema()} onSubmit={props.onSubmit} defaultValues={defaultValues}>
      <FormItem name="value" label={t('词条')}>
        <TextareaAutosize minRows={3} placeholder={t('请输入原始语言词条')} className="w-full rounded-md border p-2" />
      </FormItem>
      {props.children}
    </Form>
  )
}
