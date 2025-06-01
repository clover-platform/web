import {SCHEMA} from "@clover/public/config/pages/login/form";
import { login } from '@clover/public/rest/auth'
import { encrypt } from '@clover/public/utils/crypto'
import { type Token, setToken } from '@clover/public/utils/token'
import { Button, Form, FormItem, Input, useMessage } from '@easykit/design'
import { cloneDeep, isUndefined } from 'es-toolkit'
import { useSearchParams } from 'next/navigation'
import { type FC, type ReactNode, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MFADialog } from '../mfa-dialog'

export type LoginFormProps = {
  passwordLabel: ReactNode;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { passwordLabel } = props;
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const [loading, setLoading] = useState(false);
  const msg = useMessage();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [formData, setFormData] = useState<any>()
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const onSubmit = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    async (data: any, submitting?: boolean) => {
      const isSubmitting = isUndefined(submitting) ? true : submitting
      if (isSubmitting) {
        setLoading(true)
      }
      const originData = cloneDeep(data)
      data.password = encrypt(data.password)
      const { message, success, data: result, code } = await login(data)
      if (isSubmitting) {
        setLoading(false)
      }
      if (success) {
        setToken(result as Token)
        location.href = redirect || '/'
      } else if (code === 10009) {
        // 需要二次验证
        setFormData(originData)
        setVisible(true)
      } else {
        msg.error(message)
      }
    },
    [msg, redirect]
  )

  const onCancel = useCallback(() => {
    setVisible(false);
    setFormData(null)
  }, []);

  return (
    <>
      <Form schema={SCHEMA()} onSubmit={(data) => onSubmit(data)}>
        <FormItem name="username" label={t('邮箱或用户名')}>
          <Input placeholder={t('请输入邮箱或用户名')} />
        </FormItem>
        <FormItem name="password" label={passwordLabel}>
          <Input placeholder={t('请输入密码')} type="password" />
        </FormItem>
        <div>
          <Button className="mt-sm" loading={loading} long type="submit">
            {t('立即登录')}
          </Button>
        </div>
      </Form>
      <MFADialog visible={visible} onCancel={onCancel} formData={formData} onSubmit={onSubmit} />
    </>
  )
}
