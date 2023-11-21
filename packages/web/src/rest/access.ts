import { get, post } from "@clover/common/utils/rest";
import { RestResult } from "@clover/common/utils/rest.interface";

export interface AccessApi {
    id: number;
    path: string;
    method: string;
}

export const apiList = async (): Promise<RestResult<AccessApi[]>> => get(`@access/api/list/`);

export const addAuthority = async (data: any): Promise<RestResult<any>> => post(`@access/authority/add/`, data);

export interface AuthorityTree {
    id: number;
    name: string;
    key: string;
    children?: AuthorityTree[];
}

export const authorityTree = async (): Promise<RestResult<AuthorityTree[]>> => get(`@access/authority/tree/`);
