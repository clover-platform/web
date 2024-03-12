import {get, post} from "@easy-kit/common/utils/rest";
import { RestResult } from "@easy-kit/common/types/rest";

export type ProfileResult = RestResult<{
    authorities: string[];
    id: number;
    otpStatus: number;
    status: number;
    username: string;
}>

// 获取个人信息
export const profile = async (): Promise<ProfileResult> =>
    get(`@main/account/profile/`, null, { needLogin: false });

export const logout = async (): Promise<RestResult<any>> =>
    post(`@main/account/logout/`);
