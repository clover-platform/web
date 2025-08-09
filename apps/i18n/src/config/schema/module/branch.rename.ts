import { object, string } from 'zod'
import { t } from '@clover/public/utils/locale.client'

const NAME_REGEX = /^[a-z0-9][0-9a-z.-]*$/

export const getSchema = () =>
  object({
    name: string().min(1, t('名称不能为空')).max(255, t('最多 255 个字符')),
  }).superRefine(({ name }, ctx) => {
    if (!NAME_REGEX.test(name)) {
      ctx.addIssue({
        code: 'custom',
        path: ['name'],
        message: t('名称只能是小写字母、符号：. -，小写字母开头'),
      })
    }
  })
