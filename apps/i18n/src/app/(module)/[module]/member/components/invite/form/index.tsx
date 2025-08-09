import { RoleSelect } from './role-select'

import type { FC, PropsWithChildren } from 'react'
import { Form, FormItem, Textarea } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { getSchema, type MemberInviteFormData } from '@/config/schema/module/member'

export type MemberInviteFormProps = PropsWithChildren<{
  onSubmit?: (data: MemberInviteFormData) => void
  defaultValues?: MemberInviteFormData
  onValuesChange?: (values: MemberInviteFormData) => void
}>

export const MemberInviteForm: FC<MemberInviteFormProps> = (props) => {
  const {
    defaultValues = {
      roles: ['3'],
    },
  } = props
  const { t } = useTranslation()

  return (
    <Form<MemberInviteFormData>
      defaultValues={defaultValues}
      onSubmit={props.onSubmit}
      onValuesChange={(e) => props.onValuesChange?.(e as MemberInviteFormData)}
      schema={getSchema()}
    >
      <FormItem label={t('角色')} name="roles">
        <RoleSelect />
      </FormItem>
      <FormItem description={t('多个邮箱请使用英文,隔开')} label={t('邮箱')} name="emails">
        <Textarea placeholder="tom@demo.com,jane@demo.com" />
      </FormItem>
      <FormItem description={t('将作为邮件的附加消息进行发送。')} label={t('内容')} name="content">
        <Textarea placeholder={t('请输入')} />
      </FormItem>
      {props.children}
    </Form>
  )
}
