import { t } from '@clover/public/utils/locale.client'
import { CODE, EMAIL, PASSWORD, USERNAME } from '@clover/public/utils/regular'
import { object, string, type z } from 'zod'

const code = t('请输入6位数字验证码')

export const getFormSchema = () =>
  object({
    username: string().min(1, t('请输入用户名')).regex(USERNAME, t('请输入用户名，字母数字或下划线，字母开头')),
    email: string().min(1, t('请输入正确的邮箱')).regex(EMAIL, t('邮箱格式不正确')),
    code: string().min(1, t('请输入验证码')).regex(CODE, code),
    password: string().min(1, t('请输入密码')).regex(PASSWORD, t('密码格式不正确')),
    password2: string().min(1, t('请输入密码')).regex(PASSWORD, t('密码格式不正确')),
  }).superRefine(({ password, password2 }, ctx) => {
    if (password !== password2) {
      ctx.addIssue({
        code: 'custom',
        path: ['password2'],
        message: t('两次密码输入不一致'),
      })
    }
  })

export type RegisterFormData = z.infer<ReturnType<typeof getFormSchema>>