import type { FileFormData } from '@/config/schema/module/file'
import type { File, FileRevision } from '@/types/module/source'
import { del, get, post, put, resultWrapper } from '@clover/public/utils/rest'

export type ListFileQuery = {
  module?: string
  keyword?: string
}

export const list = (params: ListFileQuery) =>
  resultWrapper(get<File[], ListFileQuery>(`@i18n/${params.module}/file/list`, params))

export const all = (module: string) => resultWrapper(get<File[], undefined>(`@i18n/${module}/file/all`))

export type UploadFileData = {
  module: string
  fileId?: number
} & FileFormData

export const upload = (data: UploadFileData) =>
  resultWrapper(post<FileFormData, UploadFileData>(`@i18n/${data.module}/file/upload`, data))

export type Params = {
  module: string
  fileId: number
}

export const deleteFile = (data: Params) =>
  resultWrapper(del<unknown, Params>(`@i18n/${data.module}/file/${data.fileId}`))

export type PreviewResponse = string[][]

export const preview = (data: Params) =>
  resultWrapper(get<PreviewResponse, Params>(`@i18n/${data.module}/file/${data.fileId}/preview`))

export type ImportFileData = Params & {
  config: Record<number, string>
  skipFirstRow: boolean
}

export const importFile = (data: ImportFileData) =>
  resultWrapper(post<unknown, ImportFileData>(`@i18n/${data.module}/file/${data.fileId}/import`, data))

export type RenameData = Params & {
  name: string
}

export const rename = (data: RenameData) =>
  resultWrapper(put<unknown, RenameData>(`@i18n/${data.module}/file/${data.fileId}/rename`, data))

export const update = (data: UploadFileData) =>
  resultWrapper(post<unknown, UploadFileData>(`@i18n/${data.module}/file/${data.fileId}/update`, data))

export const updateBatch = (data: UploadFileData) =>
  resultWrapper(post<unknown, UploadFileData>(`@i18n/${data.module}/file/update`, data))

export type RevisionListParams = {
  module: string
  fileId: number
}

export const revisionList = (data: RevisionListParams) =>
  resultWrapper(get<FileRevision[], RevisionListParams>(`@i18n/${data.module}/file/${data.fileId}/revision/list`))