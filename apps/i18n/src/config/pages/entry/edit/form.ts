import { t } from "@clover/public/utils/locale.client";
import { object, string } from 'zod'

export const getSchema = () =>
  object({
    value: string().min(1, t('名称不能为空')),
  })
