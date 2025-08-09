import { MFADialog } from '../mfa-dialog'

import { type FC, type ReactNode, useCallback, useState } from 'react'
import { Button, Form, FormItem, Input, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { cloneDeep, isUndefined } from 'es-toolkit'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { getSchema } from '@clover/public/config/schema/login'
import { useEncrypt } from '@clover/public/hooks'
import { type LoginRestData, login } from '@clover/public/rest/auth'
import { RestError } from '@clover/public/utils/rest'
import { setToken } from '@clover/public/utils/token'

export type LoginFormProps = {
  passwordLabel: ReactNode
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { passwordLabel } = props
  const params = useSearchParams()
  const redirect = params.get('redirect')
  const [loading, setLoading] = useState(false)
  const msg = useMessage()
  const [formData, setFormData] = useState<LoginRestData | null>(null)
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()
  const encrypt = useEncrypt()

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setLoading(false)
      if (data) {
        setToken(data)
        location.href = redirect || '/'
      }
    },
    onError: (error) => {
      setLoading(false)
      if (error instanceof RestError) {
        const { code, message } = error
        if (code === 10009) {
          setVisible(true)
        } else {
          msg.error(message)
        }
      } else {
        msg.error(error.message)
      }
    },
  })

  const onSubmit = useCallback(
    (data: LoginRestData, submitting?: boolean) => {
      setLoading(isUndefined(submitting) ? true : submitting)
      setFormData(data)
      const cloneData = cloneDeep(data)
      cloneData.password = encrypt(cloneData.password)
      mutate(cloneData)
    },
    [mutate, encrypt]
  )

  const onCancel = useCallback(() => {
    setVisible(false)
    setFormData(null)
  }, [])

  return (
    <>
      <Form<LoginRestData> onSubmit={(data) => onSubmit(data)} schema={getSchema()}>
        <FormItem label={t('邮箱或用户名')} name="username">
          <Input placeholder={t('请输入邮箱或用户名')} />
        </FormItem>
        <FormItem label={passwordLabel} name="password">
          <Input placeholder={t('请输入密码')} type="password" />
        </FormItem>
        <div>
          <Button className="mt-sm" loading={loading && isPending} long type="submit">
            {t('立即登录')}
          </Button>
        </div>
      </Form>
      <MFADialog<LoginRestData>
        formData={formData}
        isPending={isPending}
        onCancel={onCancel}
        onSubmit={onSubmit}
        visible={visible}
      />
    </>
  )
}
