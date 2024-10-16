import { RestResult } from "@easykit/common/types/rest";
import { get } from "@easykit/common/utils/rest";

export const languages = async (): Promise<RestResult<any>> => get(`@i18n/language/list`);
