import { getSchema } from '@/config/schema/module/member'
import type { MemberInviteRequest } from '@/types/module/member'
import { Form, FormItem, Textarea } from '@easykit/design'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { RoleSelect } from './role-select'

export type MemberInviteFormProps = PropsWithChildren<{
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onSubmit?: (data: any) => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  defaultValues?: any
  onValuesChange?: (values: MemberInviteRequest) => void
}>

export const MemberInviteForm: FC<MemberInviteFormProps> = (props) => {
  const {
    defaultValues = {
      roles: ['3'],
    },
  } = props
  const { t } = useTranslation()

  return (
    <Form
      schema={getSchema()}
      onSubmit={props.onSubmit}
      defaultValues={defaultValues}
      onValuesChange={(e) => props.onValuesChange?.(e as MemberInviteRequest)}
    >
      <FormItem name="roles" label={t('角色')}>
        <RoleSelect />
      </FormItem>
      <FormItem name="emails" label={t('邮箱')} description={t('多个邮箱请使用英文,隔开')}>
        <Textarea placeholder="tom@demo.com,jane@demo.com" />
      </FormItem>
      <FormItem name="content" label={t('内容')} description={t('将作为邮件的附加消息进行发送。')}>
        <Textarea placeholder={t('请输入')} />
      </FormItem>
      {props.children}
    </Form>
  )
}
