import { array, object, z } from 'zod'
import { t } from '@clover/public/utils/locale.client'

export const getSchema = () =>
  object({
    files: array(
      z.object({
        name: z.string(),
        url: z.string(),
        size: z.number().optional(),
        type: z.string().optional(),
        success: z.boolean().optional(),
        error: z.string().optional(),
      })
    ).min(1, t('请上传文件')),
  })

export type FileFormData = z.infer<ReturnType<typeof getSchema>>
