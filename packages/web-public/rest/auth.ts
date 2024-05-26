import {get, post} from "@easy-kit/common/utils/rest";
import { RestResult } from "@easy-kit/common/types/rest";
import {Account} from "@clover/public/types/account";

export const login = async (data: {
    account: string;
    password: string;
    code: string;
}): Promise<RestResult<any>> => post(`@main/account/login`, data);

export type ProfileResult = RestResult<Account>

// 获取个人信息
export const profile = async (): Promise<ProfileResult> => get(`@main/account/profile`);

export const logout = async (): Promise<RestResult<any>> => post(`@main/account/logout`);
