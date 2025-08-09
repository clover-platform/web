import { object, string, type z } from 'zod'
import { t } from '@clover/public/utils/locale.client'
import { USERNAME } from '@clover/public/utils/regular'

export const getSchema = () =>
  object({
    name: string().min(1, t('团队名称不能为空')).max(20, t('最多 20 个字符')),
    key: string()
      .min(4, t('4-20个字符'))
      .max(20, t('4-20个字符'))
      .regex(USERNAME, t('只能包含字母、数字、下划线，字母开头。')),
  })

export type TeamInitFormData = z.infer<ReturnType<typeof getSchema>>
