import {RestResult} from "@easy-kit/common/types/rest";
import {post, get, put} from "@easy-kit/common/utils/rest";
import {Catalog} from "@/types/pages/book";

export type CreatePageData = {
    parent?: number;
    bookId: number;
}
export const create = (data: CreatePageData): Promise<RestResult<number>> =>
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

export const changeCatalogParent = (params: ChangeCatalogParentData): Promise<any> =>
    put("@wiki/page/catalog/parent", params);
