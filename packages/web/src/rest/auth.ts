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
