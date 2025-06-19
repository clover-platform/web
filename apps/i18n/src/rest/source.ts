import type { FileFormData } from '@/config/schema/module/file'
import type { File } from '@/types/module/file'
import { del, get, post, resultWrapper } from '@clover/public/utils/rest'

export type ListFileQuery = {
  module?: string
  keyword?: string
}

export const list = (params: ListFileQuery) =>
  resultWrapper(get<File[], ListFileQuery>(`@i18n/${params.module}/file/list`, params))

export type UploadFileData = {
  module: string
} & FileFormData

export const upload = (data: UploadFileData) =>
  resultWrapper(post<unknown, UploadFileData>(`@i18n/${data.module}/file/upload`, data))

export type DeleteFileData = {
  module: string
  fileId: number
}

export const deleteFile = (data: DeleteFileData) =>
  resultWrapper(del<unknown, DeleteFileData>(`@i18n/${data.module}/file/${data.fileId}`))