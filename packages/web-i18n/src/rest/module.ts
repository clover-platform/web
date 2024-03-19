import { RestResult } from "@easy-kit/common/types/rest";
import {get, post} from "@easy-kit/common/utils/rest";

export const list = async (params: any): Promise<RestResult<any>> =>
    get(`@i18n/module/list/`, params);

export const create = async (data: any): Promise<RestResult<any>> =>
    post(`@i18n/module/new/`, data);

export const dashboard = async (id: number): Promise<RestResult<any>> =>
    get(`@i18n/module/${id}/dashboard/`);
