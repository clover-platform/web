import {get, post} from "@clover/common/utils/rest";

// 获取个人信息
export const profile = async () =>
    await get(`@account/profile/`, null, { needLogin: false });

export const sendEmailCode = async (email: string) =>
    await post(`@account/register/email/send/`, {email});

export const emailCheck = async (data: {
    username: string;
    email: string;
    code: string;
}) =>
    await post(`@account/register/email/check/`, data);

export const otpSecret = async () =>
    await get(`@account/otp/secret/`);

export const passwordSet = async (data: {
    password: string;
    code: string;
}) =>
    await post(`@account/register/password/set/`, data);

export const sendResetEmailCode = async (email: string) =>
    await post(`@account/reset/email/send/`, {email});

export const resetEmailCheck = async (data: {
    email: string;
    code: string;
}) =>
    await post(`@account/reset/email/check/`, data);

export const passwordReset = async (data: {
    password: string;
}) =>
    await post(`@account/reset/password/`, data);

export const linkCode = async (data: {
    type: string;
    code: string;
}) =>
    await get(`@account/auth/link/${data.type}/code/`, { code: data.code });


export const loginAndLink = async (data: {
    account: string;
    password: string;
    token: string;
}) =>
    await post(`@account/auth/bind/`, data);
