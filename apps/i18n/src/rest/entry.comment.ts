import { del, get, post, resultWrapper } from '@clover/public/utils/rest'
import type { EntryComment } from '@/types/module/entry'

export type AddCommentData = {
  module: string
  entryId: number
  content: string
  language: string
  fileId?: number
}

export const add = (data: AddCommentData) =>
  resultWrapper(
    post<unknown, AddCommentData>(`@i18n/${data.module}/file/${data.fileId}/entry/${data.entryId}/comment/add`, data)
  )

export type EntryCommentQuery = {
  module: string
  entryId: number
  language: string
  page: number
  size: number
  fileId?: number
}

export type EntryCommentPage = {
  total: number
  data: EntryComment[]
}

export const list = (data: EntryCommentQuery) =>
  resultWrapper(
    get<EntryCommentPage, EntryCommentQuery>(
      `@i18n/${data.module}/file/${data.fileId}/entry/${data.entryId}/comment/list`,
      data
    )
  )

export type DeleteCommentData = {
  module: string
  entryId: number
  fileId?: number
  id: number
}
export const deleteComment = (data: DeleteCommentData) =>
  resultWrapper(
    del<EntryCommentPage>(`@i18n/${data.module}/file/${data.fileId}/entry/${data.entryId}/comment/${data.id}`)
  )
