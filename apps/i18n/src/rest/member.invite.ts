import { RestResult } from "@easykit/common/types/rest";
import { post, get, del } from "@easykit/common/utils/rest";
import { MemberInvite } from "@/types/pages/member";
import {InviteDetail} from "@/types/pages/module";

export type InviteGenerateData = {
    module: string;
    roles: string[];
}

export const generate = async (data: InviteGenerateData): Promise<RestResult<string>> =>
    post(`@i18n/${data.module}/member/invite/generate`, data);

export type InviteGenerateParams = {
    module: string;
}

export const list = async (params: InviteGenerateParams): Promise<RestResult<MemberInvite[]>> =>
    get(`@i18n/${params.module}/member/invite/list`, params);

export const revoke = async (params: {module: string, id: number}): Promise<RestResult<any>> =>
    del(`@i18n/${params.module}/member/invite/revoke`, params);

export type MemberInviteData = {
    module: string;
    roles: string[];
    emails: string;
    content: string;
}

export const send = async (data: MemberInviteData): Promise<RestResult<any>> =>
    post(`@i18n/${data.module}/member/invite/send`, data);

export type AcceptInviteData = {
    token: string;
}

export const accept = async (data: AcceptInviteData): Promise<RestResult<any>> =>
    post(`@i18n/member/invite/accept`, data);

export const detail = async (token: string): Promise<RestResult<InviteDetail|number>> =>
    get(`@i18n/member/invite/detail/${token}`);
