import type { EntryResultPage } from '@/types/module/entry'
import { del, get, post, put } from '@clover/public/utils/rest'

export type SaveEntryResultData = {
  module: string
  entryId: number
  content: string
  language: string
  branch: string
}

export const save = (data: SaveEntryResultData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, SaveEntryResultData>(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/save`, data)

export type EntryResultQuery = {
  module: string
  entryId: number
  language: string
  page: number
  size: number
  branch: string
}

export const list = (data: EntryResultQuery) =>
  get<EntryResultPage, EntryResultQuery>(
    `@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/list`,
    data
  )

export type DeleteResultData = {
  module: string
  entryId: number
  id: number
  branch: string
}
export const deleteResult = (data: DeleteResultData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  del<any>(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/${data.id}`)

export type ApproveResultData = {
  module: string
  entryId: number
  id: number
  branch: string
}
export const approve = (data: ApproveResultData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  put<any, ApproveResultData>(
    `@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/${data.id}/approve`
  )

export type RemoveApproveResultData = {
  module: string
  entryId: number
  id: number
  branch: string
}
export const removeApproval = (data: RemoveApproveResultData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  put<any, RemoveApproveResultData>(
    `@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/${data.id}/remove/approval`
  )

export type AIData = {
  module: string
  entryId: number
  language: string
  branch: string
}

export const ai = (data: AIData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, AIData>(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/ai`, data)
