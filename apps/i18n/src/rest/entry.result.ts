import type { EntryResultPage } from '@/types/module/entry'
import { del, get, post, put, resultWrapper } from '@clover/public/utils/rest'

export type SaveEntryResultData = {
  module: string
  entryId: number
  content: string
  language: string
  fileId?: number
}

export const save = (data: SaveEntryResultData) =>
  post<unknown, SaveEntryResultData>(`@i18n/${data.module}/file/${data.fileId}/entry/${data.entryId}/result/save`, data)

export type EntryResultQuery = {
  module: string
  entryId: number
  language: string
  page: number
  size: number
  fileId?: number
}

export const list = (data: EntryResultQuery) =>
  resultWrapper(
    get<EntryResultPage, EntryResultQuery>(
      `@i18n/${data.module}/file/${data.fileId}/entry/${data.entryId}/result/list`,
      data
    )
  )

export type DeleteResultData = {
  module: string
  entryId: number
  id: number
  fileId?: number
}
export const deleteResult = (data: DeleteResultData) =>
  del<unknown>(`@i18n/${data.module}/file/${data.fileId}/entry/${data.entryId}/result/${data.id}`)

export type ApproveResultData = {
  module: string
  entryId: number
  id: number
  fileId?: number
}
export const approve = (data: ApproveResultData) =>
  put<unknown, ApproveResultData>(
    `@i18n/${data.module}/file/${data.fileId}/entry/${data.entryId}/result/${data.id}/approve`
  )

export type RemoveApproveResultData = {
  module: string
  entryId: number
  id: number
  fileId?: number
}
export const removeApproval = (data: RemoveApproveResultData) =>
  put<unknown, RemoveApproveResultData>(
    `@i18n/${data.module}/file/${data.fileId}/entry/${data.entryId}/result/${data.id}/remove/approval`
  )

export type AIData = {
  module: string
  entryId: number
  language: string
  fileId?: number
}

export const ai = (data: AIData) =>
  post<unknown, AIData>(`@i18n/${data.module}/file/${data.fileId}/entry/${data.entryId}/result/ai`, data)
