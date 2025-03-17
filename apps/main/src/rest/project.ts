import {del, get, post} from "@clover/public/utils/rest";
import {PageResult} from "@clover/public/types/rest";
import {Project} from "@clover/public/types/project";

export type ProjectListParams = {
  teamId: number;
  type: string;
  keyword?: string;
  page: number;
  size: number;
}

export type ProjectListResult = PageResult<Project>;

export const list = (params: ProjectListParams) =>
  get<ProjectListResult, ProjectListParams>(`@main/project/list`, params);

export type CreateProjectData = {
  cover?: string;
  name: string;
  projectKey: string;
  teamId: string;
}

export const create = (data: CreateProjectData) =>
  post<any, CreateProjectData>(`@main/project/create`, data);

export const deleteProject = (id: number) =>
  del(`@main/project/${id}`);

export const myCollect = () =>
  get<Project[]>(`@main/project/collect/my`);

export const addCollect = (id: number) =>
  post(`@main/project/collect/add`, {id});

export const cancelCollect = (id: number) =>
  del(`@main/project/collect/cancel`, {id});

