import { object, string, type z } from 'zod'
import { t } from '@clover/public/utils/locale.client'
import { PASSWORD } from '@clover/public/utils/regular'

export const getSchema = () =>
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

export type PasswordFormData = z.infer<ReturnType<typeof getSchema>>
