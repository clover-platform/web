import { get } from "@clover/common/utils/rest";
import { RestResult } from "@clover/common/utils/rest.interface";

export interface AccessApi {
    id: number;
    path: string;
    method: string;
}

export const list = async (): Promise<RestResult<AccessApi[]>> => get(`@access/api/list/`);
