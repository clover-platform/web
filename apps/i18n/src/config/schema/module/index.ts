import { t } from '@clover/public/utils/locale.client'
import { any, array, object, string, type z } from 'zod'

const IDENTIFIER_REGEX = /^[a-z][0-9a-z-]*$/

export const getSchema = () =>
  object({
    name: string().min(1, t('名称不能为空')).max(255, t('最多 255 个字符')),
    identifier: string().min(1, t('唯一标识不能为空')).max(100, t('最多 100 个字符')),
    description: any(),
    source: string().min(1, t('请选择语言')),
    targets: array(string()),
  }).superRefine(({ identifier }, ctx) => {
    if (!IDENTIFIER_REGEX.test(identifier)) {
      ctx.addIssue({
        code: 'custom',
        path: ['identifier'],
        message: t('唯一标识只能是小写字母、数字和-，小写字母开头'),
      })
    }
  })

export type ModuleFormData = z.infer<ReturnType<typeof getSchema>>

export const getInfoSchema = () =>
  object({
    name: string().min(1, t('名称不能为空')).max(255, t('最多 255 个字符')),
    description: any(),
  })

export type ModuleInfoFormData = z.infer<ReturnType<typeof getInfoSchema>>
