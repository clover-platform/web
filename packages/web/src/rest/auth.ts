import {get, post} from "@clover/common/utils/rest";

// 获取个人信息
export const profile = async () =>
    get(`@account/profile/`, null, { needLogin: false });

export const sendEmailCode = async (email: string) =>
    post(`@account/register/email/send/`, {email});

export const emailCheck = async (data: {
    username: string;
    email: string;
    code: string;
}) =>
    post(`@account/register/email/check/`, data);

export const otpSecret = async () => get(`@account/otp/secret/`);

export const passwordSet = async (data: {
    password: string;
    code: string;
}) => post(`@account/register/password/set/`, data);

export const sendResetEmailCode = async (email: string) =>
    post(`@account/reset/email/send/`, {email});

export const resetEmailCheck = async (data: {
    email: string;
    code: string;
}) => post(`@account/reset/email/check/`, data);

export const passwordReset = async (data: {
    password: string;
}) => post(`@account/reset/password/`, data);

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
}) => post(`@account/login/`, data);
