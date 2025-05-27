import { isEmail } from '@clover/public/utils'
import { t } from '@clover/public/utils/locale.client'
import { array, object, string } from 'zod'

export const getSchema = () =>
  object({
    roles: array(string()).min(1, t('请选择角色')),
    emails: string().min(1, t('请选择创建方式')).max(1024, t('最多 1024 个字符')),
    content: string().optional(),
  }).superRefine(({ emails }, ctx) => {
    if (!emails) return
    const emailsArray = emails.split(',')
    const checked = emailsArray.every((email: string) => isEmail(email.trim()))
    if (!checked) {
      ctx.addIssue({
        code: 'custom',
        path: ['emails'],
        message: t('请检查邮箱格式是否正常'),
      })
    }
  })
