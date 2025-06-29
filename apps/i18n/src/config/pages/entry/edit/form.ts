import { t } from '@clover/public/utils/locale.client'
import { object, string, type z } from 'zod'

export const getSchema = () =>
  object({
    value: string().min(1, t('名称不能为空')),
    context: string().optional(),
  })

export type EntryEditFormData = z.infer<ReturnType<typeof getSchema>>
