import type { Catalog } from '@/types/module/book'
import type { PageDetail } from '@/types/module/page'
import type { RestResult } from '@clover/public/types/rest'
import { type AbortPromise, del, get, post, put } from '@clover/public/utils/rest'

export type CreatePageData = {
  parent?: number
  bookPath: string
  title?: string
}
export const create = (data: CreatePageData): Promise<RestResult<Catalog>> =>
  post(`@wiki/book/${data.bookPath}/page/create`, data)

export type CatalogQuery = {
  bookPath: string
}
export const catalog = (params: CatalogQuery): Promise<RestResult<Catalog[]>> =>
  get(`@wiki/book/${params.bookPath}/page/catalog`)

export type ChangeCatalogParentData = {
  bookPath: string
  id: number
  parentId?: number
}
export const changeCatalogParent = (params: ChangeCatalogParentData): Promise<RestResult<any>> =>
  put(`@wiki/book/${params.bookPath}/page/${params.id}/parent`, params)

export const detail = (bookPath: number | string, id: number | string): AbortPromise<RestResult<PageDetail>> =>
  get(`@wiki/book/${bookPath}/page/${id}`)

export type SavePageData = {
  bookPath: string
  id: number
  title: string
  content: string
  html?: string
  newVersion?: boolean
}
export const save = (data: SavePageData): AbortPromise<RestResult<number>> =>
  put(`@wiki/book/${data.bookPath}/page/${data.id}`, data)

export type CollectData = {
  bookPath: string
  id: number
  collect: boolean
}
export const collect = (data: CollectData): AbortPromise<RestResult<any>> =>
  post(`@wiki/book/${data.bookPath}/page/${data.id}/collect`, data)

export type DeletePageData = {
  bookPath: string
  id: number
  parent?: number
}

export const deletePage = (data: DeletePageData): AbortPromise<RestResult<any>> =>
  del(`@wiki/book/${data.bookPath}/page/${data.id}`, data)

export const copyPage = (bookPath: string, pageId: number): AbortPromise<RestResult<Catalog>> =>
  post(`@wiki/book/${bookPath}/page/${pageId}/copy`)
