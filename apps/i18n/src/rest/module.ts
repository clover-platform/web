import { del, get, post, put } from "@clover/public/utils/rest";
import { BaseInfo, Language, UpdateInfo } from "@/types/pages/module";

export const list = (params: any) =>
  get<any, any>(`@i18n/module/list`, params);

export const all = (params: any) =>
  get<any, any>(`@i18n/module/all`, params);

export const create = (data: any) =>
  post<any, any>(`@i18n/module/new`, data);

export const dashboard = (path: string) =>
  get<any, any>(`@i18n/${path}/dashboard`);

export const languages = (path: string) =>
  get<Language[]>(`@i18n/${path}/languages`);

export const deleteModule = (module: string) =>
  del(`@i18n/${module}`);

export const detail = (module: string) =>
  get<BaseInfo>(`@i18n/${module}`);

export const update = (data: UpdateInfo) =>
  put<BaseInfo, UpdateInfo>(`@i18n/${data.module}`, data);
