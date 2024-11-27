import { RestResult } from "@easykit/common/types/rest";
import { get } from "@easykit/common/utils/rest";

export type MemberQuery = {
    module: string;
    keyword?: string;
    type: string;
}

export const list = (params: MemberQuery): Promise<RestResult<any>> =>
    get(`@i18n/${params.module}/member/list`, params);
