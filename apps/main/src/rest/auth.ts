import {get, post} from "@clover/public/utils/rest";
import {RestResult} from "@clover/public/types/rest";

export const sendEmailCode = async (email: string) =>
    post(`@main/account/register/email/send`, {email});

export const emailCheck = async (data: {
    username: string;
    email: string;
    code: string;
}): Promise<RestResult<any>> =>
    post(`@main/account/register/email/check`, data);

export const otpSecret = async (username: string): Promise<RestResult<any>> =>
    get(`@main/account/otp/secret`, {username});

export const register = async (data: {
    username: string;
    email: string;
    password: string;
    code: string;
}): Promise<RestResult<any>> => post(`@main/account/register`, data);

export const sendResetEmailCode = async (email: string) =>
    post(`@main/account/reset/email/send`, {email});

export const resetEmailCheck = async (data: {
    email: string;
    code: string;
}): Promise<RestResult<any>> => post(`@main/account/reset/email/check`, data);

export const passwordReset = async (data: {
    password: string;
}): Promise<RestResult<any>> => post(`@main/account/reset/password`, data);

export const linkCode = async (data: {
    type: string;
    code: string;
}): Promise<RestResult<any>> =>
    get(`@account/auth/link/${data.type}/code`, { code: data.code });


export const loginAndLink = async (data: {
    account: string;
    password: string;
    token: string;
}): Promise<RestResult<any>> => post(`@account/auth/link/bind`, data);
