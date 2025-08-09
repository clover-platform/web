import { array, number, object, string } from 'zod'
import { t } from '@clover/public/utils/locale.client'

export const getSchema = () =>
  object({
    name: string().min(1, t('名称不能为空')).max(255, t('最多 255 个字符')),
    expirationTime: number().optional(),
    scopes: array(string()).nonempty(),
  })
