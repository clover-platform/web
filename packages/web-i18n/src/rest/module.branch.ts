import { RestResult } from "@easy-kit/common/types/rest";
import { get, post } from "@easy-kit/common/utils/rest";

export type ListBranchQuery = {
    id: number;
    keyword?: string;
}

export const list = async (params: ListBranchQuery): Promise<RestResult<any>> =>
    get(`@i18n/module/${params.id}/branch/list/`, params);

export type CreateBranchData = {
    moduleId: number;
    name: string;
    type: string;
}

export const create = async (data: CreateBranchData): Promise<RestResult<any>> =>
    post(`@i18n/module/${data.moduleId}/branch/create/`, data);
