import {AbortPromise, post} from "@clover/public/utils/rest";
import {RestResult} from "@clover/public/types/rest";

export const chat = (content: string): AbortPromise<RestResult<string>> =>
    post(`@wiki/ai/chat`, {content});
