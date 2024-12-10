import { RestResult } from "@clover/public/types/rest";
import { get } from "@clover/public/utils/rest";

export type MemberQuery = {
    module: string;
    keyword?: string;
    type: string;
}

export const list = (params: MemberQuery): Promise<RestResult<any>> =>
    get(`@i18n/${params.module}/member/list`, params);
