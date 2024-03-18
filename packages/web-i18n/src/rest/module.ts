import { RestResult } from "@easy-kit/common/types/rest";
import { get } from "@easy-kit/common/utils/rest";

export const list = async (params: any): Promise<RestResult<any>> =>
    get(`@i18n/module/list/`, params);
