'use client'

import LoginLink from '@/components/common/login/link'
import { type RegisterFormData, getFormSchema } from '@/config/schema/login/register'
import { register, sendEmailCode } from '@/rest/login/register'
import { EmailCodeInput } from '@clover/public/components/common/input/email-code'
import { useEncrypt } from '@clover/public/hooks'
import { setToken } from '@clover/public/utils/token'
import { Button, Form, FormItem, Input, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { cloneDeep } from 'es-toolkit'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const RegisterPage = () => {
  const msg = useMessage()
  const params = useSearchParams()
  const redirect = params.get('redirect')
  const [formData, setFormData] = useState<RegisterFormData | undefined>()
  const { t } = useTranslation()
  const encrypt = useEncrypt()

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data) {
        setToken(data)
        location.href = redirect || '/'
      }
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const onSubmit = (data: RegisterFormData) => {
    const cloneData = cloneDeep(data)
    cloneData.password2 = ''
    cloneData.password = encrypt(cloneData.password)
    mutate(cloneData)
  }

  return (
    <div className="w-[360px]">
      <div className="flex items-center justify-center">
        <div className="flex-1 font-bold text-xl">{t('注册')}</div>
        <div className="ml-[10px] space-x-1">
          <span>{t('已有账号？')}</span>
          <LoginLink href="/login">{t('登录')}</LoginLink>
        </div>
      </div>
      <div className="mt-[30px]">
        <Form<RegisterFormData>
          onValuesChange={(data) => setFormData(data as RegisterFormData)}
          onSubmit={onSubmit}
          schema={getFormSchema()}
        >
          <FormItem name="username" label={t('用户名')}>
            <Input placeholder={t('请输入用户名，字母数字或下划线，字母开头')} />
          </FormItem>
          <FormItem name="email" label={t('邮箱')}>
            <Input placeholder={t('请输入正确的邮箱')} />
          </FormItem>
          <FormItem name="code" label={t('邮箱验证码')}>
            <EmailCodeInput
              needEmail={true}
              placeholder={t('请输入邮箱验证码')}
              api={sendEmailCode}
              data={{ email: formData?.email || '' }}
            />
          </FormItem>
          <FormItem name="password" label={t('密码')}>
            <Input type="password" placeholder={t('请输入密码')} />
          </FormItem>
          <FormItem name="password2" label={t('确认密码')}>
            <Input type="password" placeholder={t('请再次输入密码')} />
          </FormItem>
          <Button loading={isPending} type="submit" long>
            {t('注册')}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default RegisterPage
