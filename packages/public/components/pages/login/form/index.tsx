import { getSchema } from '@clover/public/config/schema/login'
import { type LoginRestData, login } from '@clover/public/rest/auth'
import { encrypt } from '@clover/public/utils/crypto'
import { RestError } from '@clover/public/utils/rest'
import { setToken } from '@clover/public/utils/token'
import { Button, Form, FormItem, Input, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { cloneDeep, isUndefined } from 'es-toolkit'
import { useSearchParams } from 'next/navigation'
import { type FC, type ReactNode, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MFADialog } from '../mfa-dialog'

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
    [mutate]
  )

  const onCancel = useCallback(() => {
    setVisible(false)
    setFormData(null)
  }, [])

  return (
    <>
      <Form<LoginRestData> schema={getSchema()} onSubmit={(data) => onSubmit(data)}>
        <FormItem name="username" label={t('邮箱或用户名')}>
          <Input placeholder={t('请输入邮箱或用户名')} />
        </FormItem>
        <FormItem name="password" label={passwordLabel}>
          <Input placeholder={t('请输入密码')} type="password" />
        </FormItem>
        <div>
          <Button className="mt-sm" loading={loading && isPending} long type="submit">
            {t('立即登录')}
          </Button>
        </div>
      </Form>
      <MFADialog<LoginRestData>
        isPending={isPending}
        visible={visible}
        onCancel={onCancel}
        formData={formData}
        onSubmit={onSubmit}
      />
    </>
  )
}
