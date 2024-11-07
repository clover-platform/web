import {post, get, del, put} from "@easykit/common/utils/rest";
import {PageRequest, RestResult} from "@easykit/common/types/rest";
import {Book} from "@/types/pages/book";

export type CreateBookData = {
    nameAndLogo: {
        name: string;
        logo: string;
    };
    name: string;
    logo: string;
    path: string;
    privacy: string;
    description?: string;
}
export const create = (data: CreateBookData): Promise<RestResult<any>> =>
    post("@wiki/book/create", data);

export type BookListQuery = {
    keyword?: string;
    page?: number;
    size?: number;
    type: "all" | "create" | "join";
}

export const list = (query: BookListQuery): Promise<PageRequest<Book>> =>
    get("@wiki/book/list", query);

export const deleteBook = (path: string): Promise<RestResult<any>> =>
    del(`@wiki/book/${path}`);

export const detail = (path: string): Promise<RestResult<Book>> =>
    get(`@wiki/book/${path}`);

export type SaveHomePageData = {
    path: string;
    content: string;
}
export const saveHomePage = (data: SaveHomePageData): Promise<RestResult<void>> =>
    put(`@wiki/book/${data.path}/home/page/save`, data);
