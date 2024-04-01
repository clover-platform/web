import { RestResult } from "@easy-kit/common/types/rest";
import { get } from "@easy-kit/common/utils/rest";

export type MemberQuery = {
    moduleId: number;
    keyword?: string;
    type: string;
}

export const list = async (params: MemberQuery): Promise<RestResult<any>> =>
    get(`@i18n/member/list/`, params);
