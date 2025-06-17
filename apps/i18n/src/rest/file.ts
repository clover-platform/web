import type { File } from '@/types/module/file'
import { get, resultWrapper } from '@clover/public/utils/rest'

export type ListFileQuery = {
  module?: string
  keyword?: string
}

export const list = (params: ListFileQuery) =>
  resultWrapper(get<File[], ListFileQuery>(`@i18n/${params.module}/file/list`, params))