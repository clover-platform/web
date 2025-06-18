import type { FileFormData } from '@/config/schema/module/file'
import type { Branch, BranchMergeOverview } from '@/types/module/branch'
import { del, get, post, put, resultWrapper } from '@clover/public/utils/rest'

export type ListBranchQuery = {
  module?: string
  keyword?: string
}

export const list = (params: ListBranchQuery) =>
  resultWrapper(get<Branch[], ListBranchQuery>(`@i18n/${params.module}/branch/list`, params))

export const all = (module: string) => get<Branch[], undefined>(`@i18n/${module}/branch/all`)

export type CreateBranchData = {
  module: string
} & FileFormData

export const create = (data: CreateBranchData) =>
  resultWrapper(post<unknown, CreateBranchData>(`@i18n/${data.module}/branch/create`, data))

export const deleteBranch = (params: {
  id: number
  module: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
}) => del<any>(`@i18n/${params.module}/branch/${params.id}`)

export type RenameBranchData = {
  module: string
  id: number
  name: string
}

export const rename = (data: RenameBranchData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  put<any, RenameBranchData>(`@i18n/${data.module}/branch/${data.id}/rename`, data)

export const mergeOverview = (module: string, id: number) =>
  get<BranchMergeOverview>(`@i18n/${module}/branch/${id}/merge/overview`)

export type MergeBranchData = {
  id: number
  module: string
  deleteAfterMerge: boolean
}

export const merge = (data: MergeBranchData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  put<any, MergeBranchData>(`@i18n/${data.module}/branch/${data.id}/merge`, data)
