import { get } from "@clover/common/utils/rest";

// 获取个人信息
export const profile = async () =>
    await get(`@account/profile/`, null, { needLogin: false });

export const emailCode = async (email: string) =>
    await get(`@account/register/email/code/`, {email});
