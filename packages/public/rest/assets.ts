import {RestResult} from "@clover/public/types/rest";
import {post} from "@clover/public/utils/rest";

export type PreSignData = {
    fileName: string;
    type: 0|1;
    length?: number;
    contentType?: string;
}

export type PreSignResult = RestResult<{
    fileName: string;
    signedUrl: string;
    url: string;
}>

export const preSign = async (data: PreSignData): Promise<PreSignResult> =>
    post(`@assets/oss/file/pre-sign`, data);
