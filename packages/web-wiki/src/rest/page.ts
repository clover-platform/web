import {RestResult} from "@easy-kit/common/types/rest";
import {post, get} from "@easy-kit/common/utils/rest";

export type CreatePageData = {
    parent: number;
    bookId: number;
}
export const create = (data: CreatePageData): Promise<RestResult<number>> =>
    post("@wiki/page/create", data);

export type CatalogQuery = {
    bookId: number;
}

export const catalog = (params: CatalogQuery): Promise<RestResult<any>> =>
    get("@wiki/page/catalog", params);
