import {AbortPromise, post} from "@clover/public/utils/rest";
import {RestResult} from "@clover/public/types/rest";

export type ChatParams = {
    content: string;
    type: "chat" | "writer";
    data?: string;
}

export const chat = (params: ChatParams): AbortPromise<RestResult<string>> =>
    post(`@wiki/ai/chat`, params);
