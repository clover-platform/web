import { t } from '@clover/public/utils/locale.client'
import { PASSWORD } from '@clover/public/utils/regular'
import { object, string, type z } from 'zod'

export const getSchema = () =>
  object({
    account: string().min(1, t('请输入用户名')),
    password: string().min(1, t('请输入正确的密码')).regex(PASSWORD, t('请输入正确的密码')),
  })

export type LinkFormData = z.infer<ReturnType<typeof getSchema>>