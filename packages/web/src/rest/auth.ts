import {get, post} from "@easy-kit/common/utils/rest";
import {RestResult} from "@easy-kit/common/utils/rest.interface";

// 获取个人信息
export const profile = async () =>
    get(`@main/account/profile/`, null, { needLogin: false });

export const sendEmailCode = async (email: string) =>
    post(`@main/account/register/email/send/`, {email});

export const emailCheck = async (data: {
    username: string;
    email: string;
    code: string;
}) =>
    post(`@main/account/register/email/check/`, data);

export const otpSecret = async () => get(`@main/account/otp/secret/`);

export const passwordSet = async (data: {
    password: string;
    code: string;
}) => post(`@amain/ccount/register/password/set/`, data);

export const sendResetEmailCode = async (email: string) =>
    post(`@main/account/reset/email/send/`, {email});

export const resetEmailCheck = async (data: {
    email: string;
    code: string;
}) => post(`@main/account/reset/email/check/`, data);

export const passwordReset = async (data: {
    password: string;
}) => post(`@main/account/reset/password/`, data);

export const linkCode = async (data: {
    type: string;
    code: string;
}) =>
    get(`@account/auth/link/${data.type}/code/`, { code: data.code });


export const loginAndLink = async (data: {
    account: string;
    password: string;
    token: string;
}) => post(`@account/auth/bind/`, data);

export const login = async (data: {
    account: string;
    password: string;
    code: string;
}) => post(`@main/account/login/`, data);

export const logout = async (): Promise<RestResult<any>> =>
    post(`@main/account/logout/`);
