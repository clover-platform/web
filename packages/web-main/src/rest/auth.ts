import {get, post} from "@easy-kit/common/utils/rest";
import {RestResult} from "@easy-kit/common/types/rest";

export const sendEmailCode = async (email: string) =>
    post(`@main/account/register/email/send`, {email});

export const emailCheck = async (data: {
    username: string;
    email: string;
    code: string;
}): Promise<RestResult<any>> =>
    post(`@main/account/register/email/check`, data);

export const otpSecret = async (): Promise<RestResult<any>> => get(`@main/account/otp/secret`);

export const passwordSet = async (data: {
    password: string;
    code: string;
}): Promise<RestResult<any>> => post(`@main/account/register/password/set`, data);

export const sendResetEmailCode = async (email: string) =>
    post(`@main/account/reset/email/send/`, {email});

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
}): Promise<RestResult<any>> => post(`@account/auth/bind`, data);
