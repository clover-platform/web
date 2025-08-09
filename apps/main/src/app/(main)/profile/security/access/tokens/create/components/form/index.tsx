import { getSchema } from '../../../config/form'
import { ScopesSelect } from './scopes-select'

import type { FC, PropsWithChildren } from 'react'
import { DatePicker, Form, FormItem, Input } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import type { CreateData } from '@/rest/profile/security/access/tokens'

export type AccessTokenFormProps = PropsWithChildren<{
  onSubmit?: (data: CreateData) => void | Promise<void>
}>

export const AccessTokenForm: FC<AccessTokenFormProps> = (props) => {
  const { onSubmit } = props
  const { t } = useTranslation()

  return (
    <Form onSubmit={(data) => onSubmit?.(data as CreateData)} schema={getSchema()}>
      <FormItem label={t('令牌名称')} name="name">
        <Input className="w-md" placeholder={t('请输入')} />
      </FormItem>
      <FormItem
        description={t('不设置则不过期，不过期的令牌有一定危险，请确认。')}
        label={t('过期时间')}
        name="expirationTime"
      >
        <DatePicker allowClear={true} className="w-xs" format="yyyy-MM-dd" placeholder={t('请选择')} />
      </FormItem>
      <FormItem label={t('范围')} name="scopes">
        <ScopesSelect />
      </FormItem>
      {props.children}
    </Form>
  )
}
