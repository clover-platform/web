import {post, get, del} from "@clover/public/utils/rest";
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

export const deleteTeam = (id: number) =>
  del(`@main/team/${id}`);

export const myCollect = () =>
  get<Team[]>(`@main/team/collect/my`);

export const addCollect = (id: number) =>
  post(`@main/team/collect/add`, {id});

export const cancelCollect = (id: number) =>
  del(`@main/team/collect/cancel`, {id});
