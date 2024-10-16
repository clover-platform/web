import {post, get} from "@easykit/common/utils/rest";
import {PageRequest, RestResult} from "@easykit/common/types/rest";
import {Book} from "@/types/pages/book";

export type CreateBookData = {
    logo: string;

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
