import { type PasswordFormData, getSchema } from '@/config/schema/security/password'
import { change } from '@/rest/profile/security/password'
import bus from '@clover/public/events'
import { UNAUTHORIZED } from '@clover/public/events/auth'
import { useEncrypt } from '@clover/public/hooks'
import { Button, Card, Form, FormItem, Input, Separator, Space, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { cloneDeep } from 'es-toolkit'
import { useCallback, useRef, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const Password = () => {
  const { t } = useTranslation()
  const ref = useRef<UseFormReturn<PasswordFormData>>(null)
  const [state, setState] = useState<string>('normal')
  const m = useMessage()
  const encrypt = useEncrypt()
  const { mutate, isPending } = useMutation({
    mutationFn: change,
    onSuccess: () => {
      bus.emit(UNAUTHORIZED)
    },
    onError: (error) => {
      console.log(ref, error)
      m.error(error.message)
    },
  })

  const onSubmit = useCallback(
    (data: PasswordFormData) => {
      const cloneData = cloneDeep(data)
      cloneData.originPassword = encrypt(cloneData.originPassword)
      cloneData.password = encrypt(cloneData.password)
      cloneData.passwordConfirm = ''
      mutate(cloneData)
    },
    [mutate, encrypt]
  )

  const cancel = useCallback(() => {
    setState('normal')
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
          <Form<PasswordFormData>
            ref={ref}
            schema={getSchema()}
            onSubmit={(data) => onSubmit?.(data as PasswordFormData)}
          >
            <FormItem name="originPassword" label={t('原密码')}>
              <Input type="password" placeholder={t('请输入')} className="!w-md" />
            </FormItem>
            <FormItem name="password" label={t('新密码')}>
              <Input type="password" placeholder={t('请输入')} className="!w-md" />
            </FormItem>
            <FormItem name="passwordConfirm" label={t('确认新密码')}>
              <Input type="password" placeholder={t('请输入')} className="!w-md" />
            </FormItem>
            <Space>
              <Button loading={isPending} type="submit">
                {t('提交')}
              </Button>
              <Button variant="outline" disabled={isPending} onClick={cancel}>
                {t('取消')}
              </Button>
            </Space>
          </Form>
        ) : null}
      </div>
    </Card>
  )
}
