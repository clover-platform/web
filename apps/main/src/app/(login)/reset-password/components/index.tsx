'use client'

import { useState } from 'react'
import { Button, Form, FormItem, Input, Steps, StepsItem, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { cloneDeep } from 'es-toolkit'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { EmailCodeInput } from '@clover/public/components/common/input/email-code'
import { useEncrypt } from '@clover/public/hooks'
import { setToken } from '@clover/public/utils/token'
import {
  type EmailFormData,
  getEmailFormSchema,
  getPasswordFormSchema,
  type PasswordFormData,
} from '@/config/schema/login/reset-password'
import { passwordReset, resetEmailCheck, sendResetEmailCode } from '@/rest/login/reset-password'

const ResetPasswordPage = () => {
  const msg = useMessage()
  const params = useSearchParams()
  const redirect = params.get('redirect')
  const [step, setStep] = useState(0)
  const [formData1, setFormData1] = useState<EmailFormData>()
  const [formKey, setFormKey] = useState(Date.now())
  const { t } = useTranslation()
  const encrypt = useEncrypt()
  const { mutate: checkMutate, isPending: step1Submitting } = useMutation({
    mutationFn: resetEmailCheck,
    onError: (error) => {
      msg.error(error.message)
    },
    onSuccess: (data) => {
      if (data) {
        setToken(data)
        setFormKey(Date.now())
        setStep(1)
      }
    },
  })
  const { mutate: submitMutate, isPending: step2Submitting } = useMutation({
    mutationFn: passwordReset,
    onError: (error) => {
      msg.error(error.message)
    },
    onSuccess: (data) => {
      if (data) {
        setToken(data)
        location.href = redirect || '/'
      }
    },
  })

  const onStep1Submit = (data: EmailFormData) => checkMutate(data)

  const onPrev = () => setStep(0)

  const onStep2Submit = (data: PasswordFormData) => {
    const cloneData = cloneDeep(data)
    cloneData.password2 = ''
    cloneData.password = encrypt(cloneData.password)
    submitMutate(cloneData)
  }

  return (
    <div className="w-[360px]">
      <div className="flex items-center justify-center">
        <div className="flex-1 font-bold text-xl">{t('重置密码')}</div>
      </div>
      <div className="mt-[30px]">
        <Steps className="mb-[30px]" current={step}>
          <StepsItem title={t('邮箱验证')} />
          <StepsItem title={t('设置密码')} />
        </Steps>
        <Form<EmailFormData>
          onSubmit={onStep1Submit}
          onValuesChange={(data) => setFormData1(data as EmailFormData)}
          schema={getEmailFormSchema()}
          style={{ display: step === 0 ? 'block' : 'none' }}
        >
          <FormItem label={t('邮箱')} name="email">
            <Input placeholder={t('请输入正确的邮箱')} />
          </FormItem>
          <FormItem label={t('邮箱验证码')} name="code">
            <EmailCodeInput
              api={sendResetEmailCode}
              data={{ email: formData1?.email || '' }}
              needEmail={true}
              placeholder={t('请输入邮箱验证码')}
            />
          </FormItem>
          <Button loading={step1Submitting} long type="submit">
            {t('下一步')}
          </Button>
        </Form>
        <Form<PasswordFormData>
          key={formKey}
          onSubmit={onStep2Submit}
          schema={getPasswordFormSchema()}
          style={{ display: step === 1 ? 'block' : 'none' }}
        >
          <FormItem label={t('密码')} name="password">
            <Input placeholder={t('请输入正确的邮箱')} type="password" />
          </FormItem>
          <FormItem label={t('确认密码')} name="password2">
            <Input placeholder={t('请再次输入密码')} type="password" />
          </FormItem>
          <div className="flex gap-2">
            <Button className="flex-1" disabled={step2Submitting} long onClick={onPrev} variant="outline">
              {t('上一步')}
            </Button>
            <Button className="flex-1" loading={step2Submitting} long type="submit">
              {t('修改密码')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ResetPasswordPage
