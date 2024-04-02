import { RestResult } from "@easy-kit/common/types/rest";
import { post, get, del } from "@easy-kit/common/utils/rest";
import { MemberInvite } from "@/types/pages/member";

export type InviteGenerateData = {
    moduleId: number;
    roles: string[];
}

export const generate = async (data: InviteGenerateData): Promise<RestResult<string>> =>
    post(`@i18n/member/invite/generate/`, data);

export type InviteGenerateParams = {
    moduleId: number;
}

export const list = async (params: InviteGenerateParams): Promise<RestResult<MemberInvite[]>> =>
    get(`@i18n/member/invite/list/`, params);

export const revoke = async (params: {id: number}): Promise<RestResult<any>> =>
    del(`@i18n/member/invite/revoke/`, params);
