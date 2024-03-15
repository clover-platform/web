import {RestResult} from "@easy-kit/common/types/rest";
import {get} from "@easy-kit/common/utils/rest";

export const my = async (): Promise<RestResult<any>> => get(`@main/project/my/`);
