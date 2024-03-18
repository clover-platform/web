import { RestResult } from "@easy-kit/common/types/rest";
import { get } from "@easy-kit/common/utils/rest";

export const languages = async (): Promise<RestResult<any>> => get(`@i18n/language/list/`);
