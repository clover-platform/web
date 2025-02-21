import {get, post} from "@clover/public/utils/rest";

export const my = async () =>
  get(`@main/team/my`);


export type TeamInitData = {
  name: string;
  projectName: number;
}
export const init = async (data: TeamInitData) =>
  post(`@main/team/init`, data);
