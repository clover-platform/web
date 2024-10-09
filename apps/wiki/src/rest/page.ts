import {RestResult} from "@easy-kit/common/types/rest";
import {post, get, put, AbortPromise} from "@easy-kit/common/utils/rest";
import {Catalog} from "@/types/pages/book";
import {PageDetail} from "@/types/pages/page";

export type CreatePageData = {
    parent?: number;
    bookId: number;
}
export const create = (data: CreatePageData): Promise<RestResult<Catalog>> =>
    post(`@wiki/book/${data.bookId}/page/create`, data);

export type CatalogQuery = {
    bookId: number;
}
export const catalog = (params: CatalogQuery): Promise<RestResult<Catalog[]>> =>
    get(`@wiki/book/${params.bookId}/page/catalog`, params);

export type ChangeCatalogParentData = {
    bookId: number;
    id: number;
    parentId?: number;
}
export const changeCatalogParent = (params: ChangeCatalogParentData): Promise<RestResult<any>> =>
    put(`@wiki/book/${params.bookId}/page/parent`, params);

export const detail = (bookId:number|string, id: number|string): Promise<RestResult<PageDetail>> =>
    get(`@wiki/book/${bookId}/page/${id}`);

export type SavePageData = {
    bookId: number;
    id: number;
    title: string;
    content: string;
    newVersion?: boolean;
}
export const save = (data: SavePageData): AbortPromise<RestResult<any>> =>
    put(`@wiki/book/${data.bookId}/page/${data.id}`, data);
