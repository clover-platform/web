import {RestResult} from "@easy-kit/common/types/rest";
import {post, get, put} from "@easy-kit/common/utils/rest";
import {Catalog} from "@/types/pages/book";
import {PageDetail} from "@/types/pages/page";

export type CreatePageData = {
    parent?: number;
    bookId: number;
}
export const create = (data: CreatePageData): Promise<RestResult<Catalog>> =>
    post("@wiki/page/create", data);

export type CatalogQuery = {
    bookId: number;
}

export const catalog = (params: CatalogQuery): Promise<RestResult<Catalog[]>> =>
    get("@wiki/page/catalog", params);

export type ChangeCatalogParentData = {
    id: number;
    parentId?: number;
}

export const changeCatalogParent = (params: ChangeCatalogParentData): Promise<RestResult<any>> =>
    put("@wiki/page/catalog/parent", params);

export const detail = (id: number|string): Promise<RestResult<PageDetail>> =>
    get(`@wiki/page/${id}/detail`);

export type SavePageData = {
    id: number;
    title: string;
    content: string;
}

export const save = (data: SavePageData): Promise<RestResult<any>> =>
    put(`@wiki/page/${data.id}/save`, data);
