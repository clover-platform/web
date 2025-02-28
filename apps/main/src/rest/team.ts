import {post, get} from "@clover/public/utils/rest";
import {Team} from "@clover/public/types/team";
import {PageResult} from "@clover/public/types/rest";

export type CreateTeamData = {
  name: string;
  teamKey: string;
}

export const create = (data: CreateTeamData) =>
  post<any, CreateTeamData>(`@main/team/create`, data);

export type ListParams = {
  keyword: string;
  page: number;
  size: number;
}

export type ListResult = PageResult<Team>;

export const list = (params: ListParams) =>
  get<ListResult, ListParams>(`@main/team/list`, params);
