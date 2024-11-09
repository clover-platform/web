import { RestResult } from "@easykit/common/types/rest";
import {AbortPromise, get} from "@easykit/common/utils/rest";
import {Language} from "@/types/pages/public";

export const languages = (): AbortPromise<RestResult<Language[]>> =>
    get(`@i18n/language/list`);
