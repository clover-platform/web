import type { EntryComment } from '@/types/module/entry'
import { del, get, post, resultWrapper } from '@clover/public/utils/rest'

export type AddCommentData = {
  module: string;
  entryId: number;
  content: string;
  language: string;
  branch: string;
}

export const add = (data: AddCommentData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, AddCommentData>(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/comment/add`, data);
 
export type EntryCommentQuery = {
  module: string
  entryId: number
  language: string
  page: number
  size: number
  fileId?: number
}

export type EntryCommentPage = {
  total: number;
  data: EntryComment[];
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
  del<EntryCommentPage>(`@i18n/${data.module}/file/${data.fileId}/entry/${data.entryId}/comment/${data.id}`)
