import type { BaseInfo, Language, UpdateInfo } from '@/types/pages/module'
import { del, get, post, put } from '@clover/public/utils/rest'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const list = (params: any) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  get<any, any>('@i18n/module/list', params)

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const all = (params: any) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  get<any, any>('@i18n/module/all', params)

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const create = (data: any) => post<any, any>('@i18n/module/new', data)

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const dashboard = (path: string) => get<any, any>(`@i18n/${path}/dashboard`)

export const languages = (path: string) => get<Language[]>(`@i18n/${path}/languages`)

export const deleteModule = (module: string) => del(`@i18n/${module}`)

export const detail = (module: string) => get<BaseInfo>(`@i18n/${module}`)

export const update = (data: UpdateInfo) => put<BaseInfo, UpdateInfo>(`@i18n/${data.module}`, data)
