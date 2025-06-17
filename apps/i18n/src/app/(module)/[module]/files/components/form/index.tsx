import { getSchema, getTypeOptions } from '@/config/schema/module/branch'
import { Form, FormItem, Input, SimpleRadioGroup, Uploader } from '@easykit/design'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from "react-i18next";

export type ModuleBranchFormProps = PropsWithChildren<{
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onSubmit?: (data: any) => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  defaultValues?: any
}>

export const ModuleBranchForm: FC<ModuleBranchFormProps> = (props) => {
  const {
    defaultValues = {
      type: 'empty'
    }
  } = props;
  const { t } = useTranslation();

  return (
    <Form schema={getSchema()} onSubmit={props.onSubmit} defaultValues={defaultValues}>
      <FormItem name="file" label={t('文件')}>
        <Uploader
          accept={{
            'application/json': ['.json'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
          }}
        />
      </FormItem>
      <FormItem name="type" label="">
        <SimpleRadioGroup options={getTypeOptions()} />
      </FormItem>
      <FormItem
        name="name"
        label={t('分支名')}
        description={t('使用分支控制，可以在不影响主分支的情况下，推进翻译的改进。')}
      >
        <Input placeholder={t('请输入分支名')} />
      </FormItem>
      {props.children}
    </Form>
  )
}
