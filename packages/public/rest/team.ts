import { get, post } from "@clover/public/utils/rest";
import { RestResult } from "@clover/public/types/rest";

export const my = async (): Promise<RestResult<any>> => get(`@main/team/my`);


export type TeamInitData = {
    name: string;
    projectName: number;
}
export const init = async (data: TeamInitData): Promise<RestResult<any>> =>
    post(`@main/team/init`, data);
