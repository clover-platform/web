import type { Bundle } from '@/types/pages/bundle'
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
  name: string
  sources: string[]
  export: AddBundleDataExport
  includeSource: boolean
  module: string
}

export const create = (data: AddBundleData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, AddBundleData>(`@i18n/${data.module}/bundle/create`, data)
