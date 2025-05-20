import { get, post, del, put } from "@clover/public/utils/rest";
import { Branch } from "@/types/pages/module";
import { BranchMergeOverview } from "@/types/pages/branch";

export type ListBranchQuery = {
  module: string;
  keyword?: string;
}

export const list = (params: ListBranchQuery) =>
  get<Branch[], ListBranchQuery>(`@i18n/${params.module}/branch/list`, params);

export const all = (module: string) =>
  get<Branch[], undefined>(`@i18n/${module}/branch/all`);

export type CreateBranchData = {
  module: string;
  name: string;
  type: string;
}

export const create = (data: CreateBranchData) =>
  post<any, CreateBranchData>(`@i18n/${data.module}/branch/create`, data);

export const deleteBranch = (params: {
  id: number;
  module: string;
}) =>
  del<any>(`@i18n/${params.module}/branch/${params.id}`);

export type RenameBranchData = {
  module: string;
  id: number;
  name: string;
}

export const rename = (data: RenameBranchData) =>
  put<any, RenameBranchData>(`@i18n/${data.module}/branch/${data.id}/rename`, data);

export const mergeOverview = (module: string, id: number) =>
  get<BranchMergeOverview>(`@i18n/${module}/branch/${id}/merge/overview`);

export type MergeBranchData = {
  id: number;
  module: string;
  deleteAfterMerge: boolean;
}

export const merge = (data: MergeBranchData) =>
  put<any, MergeBranchData>(`@i18n/${data.module}/branch/${data.id}/merge`, data);
