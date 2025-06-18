import { t } from '@clover/public/utils/locale.client'
import { any, array, object, type z } from 'zod'

export const getSchema = () =>
  object({
    files: array(any()).min(1, t('请上传文件')),
  })

export type FileFormData = z.infer<ReturnType<typeof getSchema>>