import { get } from "@easy-kit/common/utils/rest";
import { RestResult } from "@easy-kit/common/types/rest";

export const my = async (): Promise<RestResult<any>> =>
    get(`@main/team/my/`, null, { needLogin: false });
