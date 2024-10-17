import {RestResult} from "@easykit/common/types/rest";
import {post, get, put, AbortPromise} from "@easykit/common/utils/rest";
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
    get(`@wiki/book/${params.bookId}/page/catalog`);

export type ChangeCatalogParentData = {
    bookId: number;
    id: number;
    parentId?: number;
}
export const changeCatalogParent = (params: ChangeCatalogParentData): Promise<RestResult<any>> =>
    put(`@wiki/book/${params.bookId}/page/parent`, params);

export const detail = (bookId:number|string, id: number|string): AbortPromise<RestResult<PageDetail>> =>
    get(`@wiki/book/${bookId}/page/${id}`);

export type SavePageData = {
    bookId: number;
    id: number;
    title: string;
    content: string;
    newVersion?: boolean;
}
export const save = (data: SavePageData): AbortPromise<RestResult<number>> =>
    put(`@wiki/book/${data.bookId}/page/${data.id}`, data);

export type CollectData = {
    bookId: number;
    id: number;
    collect: boolean;
}
export const collect = (data: CollectData): AbortPromise<RestResult<any>> =>
    post(`@wiki/book/${data.bookId}/page/${data.id}/collect`, data);
