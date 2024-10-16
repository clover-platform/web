import {RestResult} from "@easykit/common/types/rest";
import {post} from "@easykit/common/utils/rest";

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
