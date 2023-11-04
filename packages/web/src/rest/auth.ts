import { get } from "@clover/common/utils/rest";

// 获取个人信息
export const profile = async () =>
    await get(`@account/profile/`, null, { needLogin: false });
