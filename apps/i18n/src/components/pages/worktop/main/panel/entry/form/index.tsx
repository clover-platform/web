import { MultiBranchSelect } from "@/components/pages/worktop/select/multi-branch";
import { getSchema } from '@/config/pages/entry/form'
import { Form, FormItem, Input, Textarea } from '@easykit/design'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from "react-i18next";
export interface EntryFormProps extends PropsWithChildren {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onSubmit?: (data: any) => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  defaultValues?: any
}

export const EntryForm: FC<EntryFormProps> = (props) => {
  const {
    defaultValues = {}
  } = props;
  const { t } = useTranslation();

  return (
    <Form schema={getSchema()} onSubmit={props.onSubmit} defaultValues={defaultValues}>
      <FormItem name="value" label={t('词条')}>
        <Textarea placeholder={t('请输入原始语言词条')} />
      </FormItem>
      <FormItem name="key" label={t('唯一标识')}>
        <Input placeholder={t('请输入唯一标识')} />
      </FormItem>
      <FormItem name="branches" label={t('分支')}>
        <MultiBranchSelect />
      </FormItem>
      {props.children}
    </Form>
  )
}
