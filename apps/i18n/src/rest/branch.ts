import { RestResult } from "@easykit/common/types/rest";
import { get, post, del, put } from "@easykit/common/utils/rest";
import {Branch} from "@/types/pages/module";
import {BranchMergeOverview} from "@/types/pages/branch";

export type ListBranchQuery = {
    module: string;
    keyword?: string;
}

export const list = async (params: ListBranchQuery): Promise<RestResult<any>> =>
    get(`@i18n/${params.module}/branch/list`, params);

export const all = async (module: string): Promise<RestResult<Branch[]>> =>
    get(`@i18n/${module}/branch/all`);

export type CreateBranchData = {
    module: string;
    name: string;
    type: string;
}

export const create = async (data: CreateBranchData): Promise<RestResult<any>> =>
    post(`@i18n/${data.module}/branch/create`, data);

export const deleteBranch = async (params: {
    id: number;
    module: string;
}): Promise<RestResult<any>> =>
    del(`@i18n/${params.module}/branch/${params.id}`);

export type RenameBranchData = {
    module: string;
    id: number;
    name: string;
}

export const rename = async (data: RenameBranchData): Promise<RestResult<any>> =>
    put(`@i18n/${data.module}/branch/${data.id}/rename`, data);

export const mergeOverview = async (module: string, id: number): Promise<RestResult<BranchMergeOverview>> =>
    get(`@i18n/${module}/branch/${id}/merge/overview`);

export type MergeBranchData = {
    id: number;
    module: string;
    deleteAfterMerge: boolean;
}

export const merge = async (data: MergeBranchData): Promise<RestResult<any>> =>
    put(`@i18n/${data.module}/branch/${data.id}/merge`, data);
