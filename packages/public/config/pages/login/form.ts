import { t } from '@clover/public/utils/locale.client'
import { PASSWORD } from '@clover/public/utils/regular'
import { object, string } from 'zod'

export const SCHEMA = () =>
  object({
    username: string().min(1, t('请输入邮箱或用户名')),
    password: string().min(1, t('请输入密码')).regex(PASSWORD, t('密码格式不正确')),
  })
