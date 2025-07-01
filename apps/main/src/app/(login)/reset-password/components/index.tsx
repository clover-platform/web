'use client'

import {
  type EmailFormData,
  type PasswordFormData,
  getEmailFormSchema,
  getPasswordFormSchema,
} from '@/config/schema/login/reset-password'
import { passwordReset, resetEmailCheck, sendResetEmailCode } from '@/rest/login/reset-password'
import { EmailCodeInput } from '@clover/public/components/common/input/email-code'
import { useEncrypt } from '@clover/public/hooks'
import { setToken } from '@clover/public/utils/token'
import { Button, Form, FormItem, Input, Steps, StepsItem, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { cloneDeep } from 'es-toolkit'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
        <Steps current={step} className="mb-[30px]">
          <StepsItem title={t('邮箱验证')} />
          <StepsItem title={t('设置密码')} />
        </Steps>
        <Form<EmailFormData>
          onValuesChange={(data) => setFormData1(data as EmailFormData)}
          onSubmit={onStep1Submit}
          schema={getEmailFormSchema()}
          style={{ display: step === 0 ? 'block' : 'none' }}
        >
          <FormItem name="email" label={t('邮箱')}>
            <Input placeholder={t('请输入正确的邮箱')} />
          </FormItem>
          <FormItem name="code" label={t('邮箱验证码')}>
            <EmailCodeInput
              needEmail={true}
              placeholder={t('请输入邮箱验证码')}
              api={sendResetEmailCode}
              data={{ email: formData1?.email || '' }}
            />
          </FormItem>
          <Button loading={step1Submitting} type="submit" long>
            {t('下一步')}
          </Button>
        </Form>
        <Form<PasswordFormData>
          style={{ display: step === 1 ? 'block' : 'none' }}
          key={formKey}
          onSubmit={onStep2Submit}
          schema={getPasswordFormSchema()}
        >
          <FormItem name="password" label={t('密码')}>
            <Input type="password" placeholder={t('请输入正确的邮箱')} />
          </FormItem>
          <FormItem name="password2" label={t('确认密码')}>
            <Input type="password" placeholder={t('请再次输入密码')} />
          </FormItem>
          <div className="flex gap-2">
            <Button disabled={step2Submitting} className="flex-1" onClick={onPrev} variant="outline" long>
              {t('上一步')}
            </Button>
            <Button loading={step2Submitting} className="flex-1" long type="submit">
              {t('修改密码')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ResetPasswordPage
