import {del, get, post, put} from "@easykit/common/utils/rest";
import {RestResult} from "@easykit/common/types/rest";
import {Authority} from "@/types/pages/access/authority";
import {AccessApi} from "@/types/pages/access/api";
import {AccessRole} from "@/types/pages/access/role";

export const apiList = (): Promise<RestResult<AccessApi[]>> =>
    get(`@access/api/list`);

export interface AuthorityTree extends Authority {
    children?: AuthorityTree[];
}

// 权限管理
export const addAuthority = (data: Authority): Promise<RestResult<any>> =>
    post(`@access/authority/add`, data);

export const editAuthority = (data: Authority): Promise<RestResult<any>> =>
    put(`@access/authority/${data.id}`, data);

export const deleteAuthority = (id: number): Promise<RestResult<any>> =>
    del(`@access/authority/${id}`);

export const authorityTree = (): Promise<RestResult<AuthorityTree[]>> =>
    get(`@access/authority/tree`);

export const authorityDetail = (id?: number): Promise<RestResult<Authority>> =>
    get(`@access/authority/${id}`);

// 角色管理
export const addRole = (data: any): Promise<RestResult<any>> =>
    post(`@access/role/create`, data);

export const roleList = (params: any): Promise<RestResult<any>> =>
    get(`@access/role/list`, params);

export const roleDetail = (id?: number): Promise<RestResult<AccessRole>> =>
    get(`@access/role/${id}`);

export const editRole = (data: any): Promise<RestResult<any>> =>
    put(`@access/role/${data.id}`, data);

export const disableRole = (id: any): Promise<RestResult<any>> =>
    put(`@access/role/${id}/disable`);

export const enableRole = (id: any): Promise<RestResult<any>> =>
    put(`@access/role/${id}/enable`);

export const deleteRole = (id: any): Promise<RestResult<any>> =>
    del(`@access/role/${id}`);
