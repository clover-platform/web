import type { BundleFormData } from '@/config/schema/module/bundle'
import type { Bundle } from '@/types/module/bundle'
import type { PageData } from '@clover/public/types/rest'
import { get, post, resultWrapper } from '@clover/public/utils/rest'

export type BundleQuery = {
  module?: string
}

export const list = (query: BundleQuery) =>
  resultWrapper(get<PageData<Bundle>, BundleQuery>(`@i18n/${query.module}/bundle/list`, query))

export type AddBundleDataExport = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  config: any
  format: string
}

export type AddBundleData = {
  module: string
} & BundleFormData

export const create = (data: AddBundleData) =>
  resultWrapper(post<unknown, AddBundleData>(`@i18n/${data.module}/bundle/create`, data))
