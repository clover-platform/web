import {get, post} from "@clover/common/utils/rest";

// 获取个人信息
export const profile = async () =>
    await get(`@account/profile/`, null, { needLogin: false });

export const sendEmailCode = async (email: string) =>
    await post(`@account/register/email/send/`, {email});
