import {get, post} from "@clover/public/utils/rest";
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
