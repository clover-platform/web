import type { EntryEditFormData } from '@/config/pages/entry/edit/form'
import type { CreateEntryFormData } from '@/config/pages/entry/form'
import type { CountEntryData, CountEntryQuery, Entry } from '@/types/module/entry'
import type { PageData } from '@clover/public/types/rest'
import { del, get, post, put, resultWrapper } from '@clover/public/utils/rest'

export type EntryQueryParams = {
  module: string
  language: string
  keyword?: string
  fileId?: number
  page?: number
  size?: number
}

export const list = (params: EntryQueryParams) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  get<any, EntryQueryParams>(`@i18n/${params.module}/branch/${params.fileId || '-'}/entry/list`, params)

export const all = (params: EntryQueryParams) =>
  resultWrapper(
    get<PageData<Entry>, EntryQueryParams>(
      `@i18n/${params.module}/file/${params.fileId ? `${params.fileId}/` : ''}entry/all`,
      params
    )
  )

export const sync = (params: EntryQueryParams) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  get<any, EntryQueryParams>(`@i18n/${params.module}/branch/${params.fileId || '-'}/entry/sync`, params)

export type CreateEntryData = {
  module: string
} & CreateEntryFormData
export const create = (data: CreateEntryData) =>
  resultWrapper(post<unknown, CreateEntryData>(`@i18n/${data.module}/file/entry/create`, data))

export type EntryDetailParams = {
  module: string
  id?: number
  language: string
  fileId: number
}
export const detail = (params: EntryDetailParams) =>
  resultWrapper(
    get<Entry, EntryDetailParams>(`@i18n/${params.module}/file/${params.fileId}/entry/${params.id}`, {
      ...params,
      id: undefined,
    })
  )

export type EditEntryData = {
  module: string
  id: number
  fileId: number
} & EntryEditFormData
export const edit = (data: EditEntryData) =>
  resultWrapper(put<unknown, EditEntryData>(`@i18n/${data.module}/file/${data.fileId}/entry/${data.id}`, data))

export type RemoveEntryData = {
  module: string
  id: number
  fileId?: number
}
export const remove = (data: RemoveEntryData) =>
  resultWrapper(del<unknown>(`@i18n/${data.module}/file/${data.fileId}/entry/${data.id}`))

export const count = (query: CountEntryQuery) =>
  resultWrapper(
    get<CountEntryData, CountEntryQuery>(
      `@i18n/${query.module}/file/${query.fileId ? `${query.fileId}/` : ''}entry/count`,
      query
    )
  )
