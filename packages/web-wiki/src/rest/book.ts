import {post} from "@easy-kit/common/utils/rest";
import {RestResult} from "@easy-kit/common/types/rest";

export type CreateBookData = {
    logo: string;

}
export const create = (data: CreateBookData): Promise<RestResult<any>> =>
    post("@wiki/book/create", data);
