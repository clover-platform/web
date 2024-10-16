import { get, post } from "@easykit/common/utils/rest";
import { RestResult } from "@easykit/common/types/rest";

export const my = async (): Promise<RestResult<any>> => get(`@main/team/my`);


export type TeamInitData = {
    name: string;
    projectName: number;
}
export const init = async (data: TeamInitData): Promise<RestResult<any>> =>
    post(`@main/team/init`, data);
