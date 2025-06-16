import type { ActivityQueryParams, ActivityResult } from '@/types/module/activity'
import type { PageData } from '@clover/public/types/rest'
import { get } from '@clover/public/utils/rest'

export const list = (params: ActivityQueryParams) =>
  get<PageData<ActivityResult>, ActivityQueryParams>(`@i18n/${params.module}/activity/list`, params)
