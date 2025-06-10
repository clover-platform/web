import { DatePicker, Form, FormItem, Input } from '@easykit/design'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import type { CreateData } from '../../../components/rest'
import { getSchema } from '../../../config/form'
import { ScopesSelect } from './scopes-select'

export type AccessTokenFormProps = PropsWithChildren<{
  onSubmit?: (data: CreateData) => void | Promise<void>
}>

export const AccessTokenForm: FC<AccessTokenFormProps> = (props) => {
  const { onSubmit } = props
  const { t } = useTranslation()

  return (
    <Form schema={getSchema()} onSubmit={(data) => onSubmit?.(data as CreateData)}>
      <FormItem name="name" label={t('令牌名称')}>
        <Input placeholder={t('请输入')} className="w-input-md" />
      </FormItem>
      <FormItem
        name="expirationTime"
        label={t('过期时间')}
        description={t('不设置则不过期，不过期的令牌有一定危险，请确认。')}
      >
        <DatePicker className="w-input-xs" format="yyyy-MM-dd" allowClear={true} placeholder={t('请选择')} />
      </FormItem>
      <FormItem name="scopes" label={t('范围')}>
        <ScopesSelect />
      </FormItem>
      {props.children}
    </Form>
  )
}
