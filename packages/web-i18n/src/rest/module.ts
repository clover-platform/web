import { RestResult } from "@easy-kit/common/types/rest";
import {del, get, post} from "@easy-kit/common/utils/rest";
import {Language} from "@/types/pages/module";

export const list = async (params: any): Promise<RestResult<any>> =>
    get(`@i18n/module/list/`, params);

export const all = async (params: any): Promise<RestResult<any>> =>
    get(`@i18n/module/all/`, params);

export const create = async (data: any): Promise<RestResult<any>> =>
    post(`@i18n/module/new/`, data);

export const dashboard = async (id: number): Promise<RestResult<any>> =>
    get(`@i18n/module/${id}/dashboard/`);

export const languages = async (id: number): Promise<RestResult<Language[]>> =>
    get(`@i18n/module/${id}/languages/`);

export const deleteModule = async (id: number): Promise<any> =>
    del(`@i18n/module/${id}/`);
