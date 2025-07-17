import type { Activity } from '@clover/public/types/activity'
import type { PageData } from '@clover/public/types/rest'
import { get, resultWrapper } from '@clover/public/utils/rest'

export type ActivityQueryParams = {
  moduleId?: number
  page?: number
  size?: number
}

export const list = (params: ActivityQueryParams) =>
  resultWrapper(get<PageData<Activity>, ActivityQueryParams>('@i18n/activity/list', params))