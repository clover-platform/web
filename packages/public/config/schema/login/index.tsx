import { object, string, type z } from 'zod'
import { t } from '@clover/public/utils/locale.client'
import { PASSWORD } from '@clover/public/utils/regular'

export const getSchema = () =>
  object({
    username: string().min(1, t('请输入邮箱或用户名')),
    password: string().min(1, t('请输入密码')).regex(PASSWORD, t('密码格式不正确')),
  })

export type LoginFormData = z.infer<ReturnType<typeof getSchema>>
