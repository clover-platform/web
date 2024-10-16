import { RestResult } from "@easykit/common/types/rest";
import {del, get, post, put} from "@easykit/common/utils/rest";
import {BaseInfo, InviteDetail, Language, UpdateInfo} from "@/types/pages/module";

export const list = async (params: any): Promise<RestResult<any>> =>
    get(`@i18n/module/list`, params);

export const all = async (params: any): Promise<RestResult<any>> =>
    get(`@i18n/module/all`, params);

export const create = async (data: any): Promise<RestResult<any>> =>
    post(`@i18n/module/new`, data);

export const dashboard = async (id: number): Promise<RestResult<any>> =>
    get(`@i18n/module/${id}/dashboard`);

export const languages = async (id: number): Promise<RestResult<Language[]>> =>
    get(`@i18n/module/${id}/languages`);

export const deleteModule = async (id: number): Promise<any> =>
    del(`@i18n/module/${id}`);

export const detail = async (id: number): Promise<RestResult<BaseInfo>> =>
    get(`@i18n/module/${id}`);

export const update = async (data: UpdateInfo): Promise<RestResult<BaseInfo>> =>
    put(`@i18n/module/${data.id}`, data);
