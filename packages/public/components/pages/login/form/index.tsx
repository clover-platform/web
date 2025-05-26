import { CodeInput } from '@clover/public/components/common/input/code'
import {SCHEMA} from "@clover/public/config/pages/login/form";
import { login } from '@clover/public/rest/auth'
import { encrypt } from '@clover/public/utils/crypto'
import { t } from '@clover/public/utils/locale.client'
import { CODE } from '@clover/public/utils/regular'
import { type Token, setToken } from '@clover/public/utils/token'
import { Button, Dialog, Form, FormItem, Input, useMessage } from '@easykit/design'
import { cloneDeep } from "es-toolkit";
import { useSearchParams } from 'next/navigation'
import { type FC, type ReactNode, useCallback, useState } from 'react'
import { useTranslation } from "react-i18next"; 
import { object, string } from 'zod'

const getSchema = () =>
  object({
    code: string().min(1, t('请输入身份验证 App 验证码')).regex(CODE, t('请输入6位数字验证码')),
  })

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

  const submit = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    async (data: any) => {
      const originData = cloneDeep(data)
      setLoading(true)
      data.password = encrypt(data.password)
      const { message, success, data: result, code } = await login(data)
      setLoading(false)
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

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onSubmitOTP = useCallback((data: any) => {
    submit({
      ...data,
      ...formData
    }).then();
  }, [formData, submit])

  return (
    <>
      <Form schema={SCHEMA()} onSubmit={submit}>
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
      <Dialog
        visible={visible}
        onCancel={onCancel}
        title={t('二次验证')}
        maskClosable={false}
        className="max-w-[480px]"
      >
        <Form onSubmit={onSubmitOTP} schema={getSchema()}>
          <FormItem name="code" label={t('验证码')}>
            <CodeInput placeholder={t('请输入身份验证 App 验证码')} />
          </FormItem>
          <Button loading={loading} type="submit" long>
            {t('确认')}
          </Button>
        </Form>
      </Dialog>
    </>
  )
}
