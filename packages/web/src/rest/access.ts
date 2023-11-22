import { get, post, put } from "@clover/common/utils/rest";
import { RestResult } from "@clover/common/utils/rest.interface";

export interface AccessApi {
    id: number;
    path: string;
    method: string;
}

export const apiList = async (): Promise<RestResult<AccessApi[]>> => get(`@access/api/list/`);

export const addAuthority = async (data: any): Promise<RestResult<any>> => post(`@access/authority/add/`, data);

export const editAuthority = async (data: any): Promise<RestResult<any>> => put(`@access/authority/edit/`, data);

export interface Authority {
    id?: number;
    name: string;
    key: string;
    parentId?: number;
}

export interface AuthorityTree extends Authority {
    children?: AuthorityTree[];
}

export const authorityTree = async (): Promise<RestResult<AuthorityTree[]>> => get(`@access/authority/tree/`);

export const authorityDetail = async (id: number): Promise<RestResult<Authority>> => get(`@access/authority/${id}/detail/`);
