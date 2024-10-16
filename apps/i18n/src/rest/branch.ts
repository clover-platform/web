import { RestResult } from "@easykit/common/types/rest";
import { get, post, del, put } from "@easykit/common/utils/rest";
import {Branch} from "@/types/pages/module";
import {BranchMergeOverview} from "@/types/pages/branch";

export type ListBranchQuery = {
    moduleId: number;
    keyword?: string;
}

export const list = async (params: ListBranchQuery): Promise<RestResult<any>> =>
    get(`@i18n/branch/list`, params);

export const all = async (id: number): Promise<RestResult<Branch[]>> =>
    get(`@i18n/branch/all`, {
        moduleId: id,
    });

export type CreateBranchData = {
    moduleId: number;
    name: string;
    type: string;
}

export const create = async (data: CreateBranchData): Promise<RestResult<any>> =>
    post(`@i18n/branch/create`, data);

export const deleteBranch = async (params: {
    id: number;
    moduleId: number;
}): Promise<RestResult<Branch[]>> =>
    del(`@i18n/branch/${params.id}`);

export type RenameBranchData = {
    moduleId: number;
    id: number;
    name: string;
}

export const rename = async (data: RenameBranchData): Promise<RestResult<any>> =>
    put(`@i18n/branch/${data.id}/rename`, data);

export const mergeOverview = async (id: number): Promise<RestResult<BranchMergeOverview>> =>
    get(`@i18n/branch/${id}/merge/overview`);

export type MergeBranchData = {
    id: number;
    moduleId: number;
    deleteAfterMerge: boolean;
}

export const merge = async (data: MergeBranchData): Promise<RestResult<any>> =>
    put(`@i18n/branch/${data.id}/merge`, data);
