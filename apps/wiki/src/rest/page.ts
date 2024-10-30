import {RestResult} from "@easykit/common/types/rest";
import {post, get, put, AbortPromise} from "@easykit/common/utils/rest";
import {Catalog} from "@/types/pages/book";
import {PageDetail} from "@/types/pages/page";

export type CreatePageData = {
    parent?: number;
    bookPath: string;
}
export const create = (data: CreatePageData): Promise<RestResult<Catalog>> =>
    post(`@wiki/book/${data.bookPath}/page/create`, data);

export type CatalogQuery = {
    bookPath: string;
}
export const catalog = (params: CatalogQuery): Promise<RestResult<Catalog[]>> =>
    get(`@wiki/book/${params.bookPath}/page/catalog`);

export type ChangeCatalogParentData = {
    bookPath: string;
    id: number;
    parentId?: number;
}
export const changeCatalogParent = (params: ChangeCatalogParentData): Promise<RestResult<any>> =>
    put(`@wiki/book/${params.bookPath}/page/parent`, params);

export const detail = (bookPath:number|string, id: number|string): AbortPromise<RestResult<PageDetail>> =>
    get(`@wiki/book/${bookPath}/page/${id}`);

export type SavePageData = {
    bookPath: string;
    id: number;
    title: string;
    content: string;
    newVersion?: boolean;
}
export const save = (data: SavePageData): AbortPromise<RestResult<number>> =>
    put(`@wiki/book/${data.bookPath}/page/${data.id}`, data);

export type CollectData = {
    bookPath: string;
    id: number;
    collect: boolean;
}
export const collect = (data: CollectData): AbortPromise<RestResult<any>> =>
    post(`@wiki/book/${data.bookPath}/page/${data.id}/collect`, data);
