import {AbortPromise, post} from "@clover/public/utils/rest";
import {RestResult} from "@clover/public/types/rest";

export const chat = (content: string): AbortPromise<RestResult<String>> =>
    post(`@wiki/ai/chat`, {content});
