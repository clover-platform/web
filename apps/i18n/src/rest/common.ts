import { RestResult } from "@clover/public/types/rest";
import {AbortPromise, get} from "@clover/public/utils/rest";
import {Language} from "@/types/pages/public";

export const languages = (): AbortPromise<RestResult<Language[]>> =>
    get(`@i18n/language/list`);
