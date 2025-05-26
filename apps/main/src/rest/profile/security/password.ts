import {post} from "@clover/public/utils/rest";

export type PasswordData = {
  originPassword: string;
  password: string;
  passwordConfirm?: string;
}

export const change = (data: PasswordData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, PasswordData>('@main/account/password/change', data)
