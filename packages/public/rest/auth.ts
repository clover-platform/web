import {get, post} from "@clover/public/utils/rest";
import {RestResult} from "@clover/public/types/rest";
import {Account} from "@clover/public/types/account";

export const login = (data: {
  account: string;
  password: string;
  code: string;
}) => post(`@main/account/login`, data);

// 获取个人信息
export const profile = () =>
  get<Account, null>(`@main/account/profile`, null);

export const logout = () =>
  post(`@main/account/logout`);
