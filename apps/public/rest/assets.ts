import {RestResult} from "@easy-kit/common/types/rest";
import {post} from "@easy-kit/common/utils/rest";

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
