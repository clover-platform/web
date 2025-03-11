import {get, post, put} from "@clover/public/utils/rest";
import {Project} from "@clover/public/types/project";

export const my = () =>
  get(`@main/team/my`);


export type TeamInitData = {
  name: string;
  projectName: number;
}
export const init = (data: TeamInitData) =>
  post(`@main/team/init`, data);

export const myByTeamId = (teamId: number|string) =>
  get<Project[]>(`@main/team/${teamId}/projects`);

export type ChangeTeamData = {
  teamId: number|string;
  projectId: number|string;
}

export const change = (data?: ChangeTeamData) =>
  put<any, ChangeTeamData>(`@main/team/change`, data);
