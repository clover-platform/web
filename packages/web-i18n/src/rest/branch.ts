import { RestResult } from "@easy-kit/common/types/rest";
import { get, post } from "@easy-kit/common/utils/rest";
import {Branch} from "@/types/pages/module";

export type ListBranchQuery = {
    id: number;
    keyword?: string;
}

export const list = async (params: ListBranchQuery): Promise<RestResult<any>> =>
    get(`@i18n/${params.id}/branch/list/`, params);

export const all = async (id: number): Promise<RestResult<Branch[]>> =>
    get(`@i18n/${id}/branch/all/`);

export type CreateBranchData = {
    moduleId: number;
    name: string;
    type: string;
}

export const create = async (data: CreateBranchData): Promise<RestResult<any>> =>
    post(`@i18n/${data.moduleId}/branch/create/`, data);
