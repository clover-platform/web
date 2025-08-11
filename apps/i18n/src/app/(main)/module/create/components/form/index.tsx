import type { FC, PropsWithChildren } from 'react'
import { Form, FormItem, Input, Textarea } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { LanguageSelect } from '@/components/common/select/language'
import { MultiLanguageSelect } from '@/components/common/select/multi-language'
import { getSchema, type ModuleFormData } from '@/config/schema/module'
export interface ModuleFormProps extends PropsWithChildren {
  onSubmit?: (data: ModuleFormData) => void
  defaultValues?: ModuleFormData
} 

const ModuleForm: FC<ModuleFormProps> = (props) => {
  const { defaultValues = {} } = props
  const { t } = useTranslation()

  return (
    <Form defaultValues={defaultValues} onSubmit={props.onSubmit} schema={getSchema()}>
      <FormItem description={t('唯一标识只能是小写字母和-，小写字母开头')} label={t('名称')} name="name">
        <Input className="max-w-96" placeholder={t('请输入模块名称')} />
      </FormItem>
      <FormItem label={t('唯一标识')} name="identifier">
        <Input className="max-w-96" placeholder={t('请输入唯一标识')} />
      </FormItem>
      <FormItem label={t('描述')} name="description">
        <Textarea placeholder={t('请输入模块描述')} />
      </FormItem>
      <FormItem label={t('源语言')} name="source">
        <LanguageSelect className="max-w-96" placeholder={t('请输入选择源语言')} />
      </FormItem>
      <FormItem label={t('目标语言')} name="targets">
        <MultiLanguageSelect />
      </FormItem>
      {props.children}
    </Form>
  )
}

export default ModuleForm
