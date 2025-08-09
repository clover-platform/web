import { array, number, object, string, type z } from 'zod'
import { t } from '@clover/public/utils/locale.client'

export const getSchema = () =>
  object({
    value: string().min(1, t('名称不能为空')),
    key: string().min(1, t('唯一标识不能为空')).max(1024, t('最多 512 个字符')),
    context: string().optional(),
    files: array(number()),
  }).superRefine(({ files }, ctx) => {
    if ((files?.length || 0) === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['files'],
        message: t('请选择分支'),
      })
    }
    return ctx
  })

export type CreateEntryFormData = z.infer<ReturnType<typeof getSchema>>
