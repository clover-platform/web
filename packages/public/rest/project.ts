import {RestResult} from "@easykit/common/types/rest";
import {get} from "@easykit/common/utils/rest";

export const my = async (): Promise<RestResult<any>> => get(`@main/project/my`);
