import {RestResult} from "@clover/public/types/rest";
import {get} from "@clover/public/utils/rest";

export const my = async (): Promise<RestResult<any>> => get(`@main/project/my`);
