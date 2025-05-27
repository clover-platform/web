import type { Bundle } from '@/types/pages/bundle'
import { get, post } from '@clover/public/utils/rest'

export type BundleQuery = {
  page: number
  size: number
  module: string
  keyword?: string
}

export const list = (query: BundleQuery) =>
  get<
    {
      total: number
      data: Bundle[]
    },
    BundleQuery
  >(`@i18n/${query.module}/bundle/list`, query)

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
