import { t } from '@clover/public/utils/locale.client'
import { array, object, string } from 'zod'

export const getSchema = () =>
  object({
    value: string().min(1, t('名称不能为空')),
    key: string().min(1, t('唯一标识不能为空')).max(1024, t('最多 1024 个字符')),
    branches: array(string()),
  }).superRefine(({ branches }, ctx) => {
    if ((branches?.length || 0) === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['branches'],
        message: t('请选择分支'),
      })
    }
    return ctx
  })
