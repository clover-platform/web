import {AbortPromise, get, post, del} from "@clover/public/utils/rest";
import {PageResult, RestResult} from "@clover/public/types/rest";
import {AccessToken} from "@/types/profile/access/token";

export const list = (params: any): AbortPromise<PageResult<AccessToken>> =>
    get(`@main/account/access/token/list`, params);

export type CreateData = {
    name: string;
    expirationTime?: number;
}

export const create = (data: CreateData): AbortPromise<RestResult<string>> =>
    post(`@main/account/access/token/create`, data);

export const revoke = (id: number): AbortPromise<RestResult<any>> =>
    del(`@main/account/access/token/${id}/revoke`);
