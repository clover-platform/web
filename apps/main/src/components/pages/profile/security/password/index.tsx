import { type PasswordData, change } from '@/rest/profile/security/password'
import bus from '@clover/public/events'
import { UNAUTHORIZED } from '@clover/public/events/auth'
import { type FormResult, useFormResult } from '@clover/public/hooks'
import { encrypt } from '@clover/public/utils/crypto'
import { t } from '@clover/public/utils/locale.client'
import { PASSWORD } from '@clover/public/utils/regular'
import { Button, Card, Form, FormItem, Input, Separator, Space } from '@easykit/design'
import { useCallback, useRef, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { object, string } from 'zod'

export const SCHEMA = () =>
  object({
    originPassword: string().min(1, t('请输入密码')).regex(PASSWORD, t('密码格式不正确')),
    password: string().min(1, t('请输入密码')).regex(PASSWORD, t('密码格式不正确')),
    passwordConfirm: string().min(1, t('请输入密码')).regex(PASSWORD, t('密码格式不正确')),
  }).superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirm'],
        message: t('两次密码输入不一致'),
      })
    }
  })

export const Password = () => {
  const { t } = useTranslation()
  const ref = useRef<UseFormReturn>(null)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const formResult = useFormResult<any>({
    ref,
    onSuccess: () => {
      bus.emit(UNAUTHORIZED)
    },
  })
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState<string>('normal')

  const onSubmit = useCallback(async (data: PasswordData, result: FormResult<string>) => {
    setLoading(true)
    data.originPassword = encrypt(data.originPassword)
    data.password = encrypt(data.password)
    data.passwordConfirm = undefined
    result(await change(data))
    setLoading(false)
  }, [])

  const cancel = useCallback(() => {
    setState('normal')
    setLoading(false)
  }, [])

  return (
    <Card title={t('更改密码')}>
      <div className="space-y-4">
        <p>{t('当您更改密码后，我们会使您在此设备上保持已登录状态，但可能会将您从其他设备注销。')}</p>
        <Separator />
        {state === 'normal' ? (
          <p>
            <button type="button" onClick={() => setState('change')} className="cursor-pointer">
              {t('修改密码')}
            </button>
          </p>
        ) : null}
        {state === 'change' ? (
          <Form ref={ref} schema={SCHEMA()} onSubmit={(data) => onSubmit?.(data as PasswordData, formResult)}>
            <FormItem name="originPassword" label={t('原密码')}>
              <Input type="password" placeholder={t('请输入')} className="!w-input-md" />
            </FormItem>
            <FormItem name="password" label={t('新密码')}>
              <Input type="password" placeholder={t('请输入')} className="!w-input-md" />
            </FormItem>
            <FormItem name="passwordConfirm" label={t('确认新密码')}>
              <Input type="password" placeholder={t('请输入')} className="!w-input-md" />
            </FormItem>
            <Space>
              <Button loading={loading} type="submit">
                {t('提交')}
              </Button>
              <Button variant="outline" onClick={cancel}>
                {t('取消')}
              </Button>
            </Space>
          </Form>
        ) : null}
      </div>
    </Card>
  )
}
