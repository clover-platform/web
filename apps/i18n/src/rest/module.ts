import { RestResult } from "@easykit/common/types/rest";
import {del, get, post, put} from "@easykit/common/utils/rest";
import {BaseInfo, Language, UpdateInfo} from "@/types/pages/module";

export const list = async (params: any): Promise<RestResult<any>> =>
    get(`@i18n/module/list`, params);

export const all = async (params: any): Promise<RestResult<any>> =>
    get(`@i18n/module/all`, params);

export const create = async (data: any): Promise<RestResult<any>> =>
    post(`@i18n/module/new`, data);

export const dashboard = async (path: string): Promise<RestResult<any>> =>
    get(`@i18n/${path}/dashboard`);

export const languages = async (path: string): Promise<RestResult<Language[]>> =>
    get(`@i18n/${path}/languages`);

export const deleteModule = (module: string): Promise<any> =>
    del(`@i18n/${module}`);

export const detail = (module: string): Promise<RestResult<BaseInfo>> =>
    get(`@i18n/${module}`);

export const update = (data: UpdateInfo): Promise<RestResult<BaseInfo>> =>
    put(`@i18n/${data.module}`, data);
