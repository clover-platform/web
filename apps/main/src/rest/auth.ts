import {get, post} from "@clover/public/utils/rest";

export const sendEmailCode = (data: { email: string }) =>
  post<any, { email: string }>(`@main/account/register/email/send`, data);

type RegisterData = {
  username: string;
  email: string;
  password: string;
  code: string;
}
export const register = (data: RegisterData) =>
  post<any, RegisterData>(`@main/account/register`, data);

export const sendResetEmailCode = (data: { email: string }) =>
  post<any, { email: string }>(`@main/account/reset/email/send`, data);

type ResetEmailCheckData = {
  email: string;
  code: string;
}
export const resetEmailCheck = (data: ResetEmailCheckData) =>
  post<any, ResetEmailCheckData>(`@main/account/reset/email/check`, data);

type PasswordResetData = {
  password: string;
}
export const passwordReset = (data: PasswordResetData) =>
  post<any, PasswordResetData>(`@main/account/reset/password`, data);

type LinkCodeData = {
  type?: string;
  code: string;
}
export const linkCode = (data: LinkCodeData) =>
  get<any, LinkCodeData>(`@account/auth/link/${data.type}/code`, {code: data.code});

type LoginAndLinkData = {
  account: string;
  password: string;
  token: string;
}
export const loginAndLink = (data: LoginAndLinkData) =>
  post<any, LoginAndLinkData>(`@account/auth/link/bind`, data);

export const otpSecret = () =>
  get<any>(`@main/account/otp/secret`);

export type OTPStatus = {
  enable: boolean;
  enableTime: number;
}

export const otpStatus = () =>
  get<OTPStatus>(`@main/account/otp/status`);

export type OTPBindData = {
  code: string;
  otpCode: string;
}

export const otpBind = (data: OTPBindData) =>
  post<any, OTPBindData>(`@main/account/otp/bind`, data);

export const otpDisable = (data: {code: string}) =>
  post<any, {code: string}>(`@main/account/otp/disable`, data);
