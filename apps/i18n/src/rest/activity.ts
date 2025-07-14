import type { Activity, ActivityQueryParams } from '@/types/module/activity'
import type { PageData } from '@clover/public/types/rest'
import { get, resultWrapper } from '@clover/public/utils/rest'

export const list = (params: ActivityQueryParams) =>
  resultWrapper(get<PageData<Activity>, ActivityQueryParams>('@i18n/activity/list', params))