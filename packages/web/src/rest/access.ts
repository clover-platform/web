import {del, get, post, put} from "@clover/common/utils/rest";
import { RestResult } from "@clover/common/utils/rest.interface";

export interface AccessApi {
    id: number;
    path: string;
    method: string;
}

export const apiList = async (): Promise<RestResult<AccessApi[]>> =>
    get(`@access/api/list/`);

export interface Authority {
    id?: number;
    name: string;
    key: string;
    parentId?: number;
}

export interface AuthorityTree extends Authority {
    children?: AuthorityTree[];
}

// 权限管理
export const addAuthority = async (data: any): Promise<RestResult<any>> =>
    post(`@access/authority/add/`, data);

export const editAuthority = async (data: any): Promise<RestResult<any>> =>
    put(`@access/authority/${data.id}/`, data);

export const deleteAuthority = async (id: number): Promise<RestResult<any>> =>
    del(`@access/authority/${id}/`);

export const authorityTree = async (): Promise<RestResult<AuthorityTree[]>> =>
    get(`@access/authority/tree/`);

export const authorityDetail = async (id?: number): Promise<RestResult<Authority>> =>
    get(`@access/authority/${id}/detail/`);

// 角色管理
export const addRole = async (data: any): Promise<RestResult<any>> =>
    post(`@access/role/create/`, data);

export const roleList = async (params: any): Promise<RestResult<any>> =>
    get(`@access/role/list/`, params);

export const roleDetail = async (id?: number): Promise<RestResult<any>> =>
    get(`@access/role/${id}/detail/`);

export const editRole = async (data: any): Promise<RestResult<any>> =>
    put(`@access/role/${data.id}/`, data);

export const disableRole = async (id: any): Promise<RestResult<any>> =>
    put(`@access/role/${id}/disable/`);

export const enableRole = async (id: any): Promise<RestResult<any>> =>
    put(`@access/role/${id}/enable/`);

export const deleteRole = async (id: any): Promise<RestResult<any>> =>
    del(`@access/role/${id}/`);
