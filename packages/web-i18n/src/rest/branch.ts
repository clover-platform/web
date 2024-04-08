import { RestResult } from "@easy-kit/common/types/rest";
import { get, post, del, put } from "@easy-kit/common/utils/rest";
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

export const deleteBranch = async (params: {
    id: number;
    moduleId: number;
}): Promise<RestResult<Branch[]>> =>
    del(`@i18n/${params.moduleId}/branch/${params.id}/delete/`);

export type RenameBranchData = {
    moduleId: number;
    id: number;
    name: string;
}

export const rename = async (data: RenameBranchData): Promise<RestResult<any>> =>
    put(`@i18n/${data.moduleId}/branch/${data.id}/rename/`, data);
