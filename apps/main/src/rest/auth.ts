import {get, post} from "@clover/public/utils/rest";

export const sendEmailCode = (email: string) =>
    post<any, {email:string}>(`@main/account/register/email/send`, {email});

export const otpSecret = (username: string) =>
    get<any, {username:string}>(`@main/account/otp/secret`, {username});

type RegisterData = {
    username: string;
    email: string;
    password: string;
    code: string;
}
export const register = (data: RegisterData) =>
    post<any, RegisterData>(`@main/account/register`, data);

export const sendResetEmailCode = async (email: string) =>
    post<any, {email:string}>(`@main/account/reset/email/send`, {email});

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
    get<any, LinkCodeData>(`@account/auth/link/${data.type}/code`, { code: data.code });

type LoginAndLinkData = {
    account: string;
    password: string;
    token: string;
}
export const loginAndLink = (data: LoginAndLinkData) =>
    post<any, LoginAndLinkData>(`@account/auth/link/bind`, data);
