import { t } from '@clover/public/utils/locale.client'
import { CODE } from '@clover/public/utils/regular'
import { object, string } from 'zod'

export const getFormSchema = () =>
  object({
    code: string().min(1, t('请输入邮箱验证码')).regex(CODE, t('请输入6位数字验证码')),
    otpCode: string().min(1, t('请输入身份验证 App 验证码')).regex(CODE, t('请输入6位数字验证码')),
  })
