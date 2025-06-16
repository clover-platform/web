import type { ModuleFormData } from '@/config/schema/module'
import type { BaseInfo, Module, UpdateInfo } from '@/types/module'
import type { ModuleDashboard } from '@/types/module/dashboard'
import type { Language } from '@/types/public'
import type { PageData } from '@clover/public/types/rest'
import { del, get, post, put, resultWrapper } from '@clover/public/utils/rest'

export type ModuleListParams = {
  page?: number
  size?: number
  keyword?: string
  type?: string
}

export const list = (params: ModuleListParams) =>
  resultWrapper(get<PageData<Module>, ModuleListParams>('@i18n/module/list', params))

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const all = (params: any) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  get<any, any>('@i18n/module/all', params)

export const create = (data: ModuleFormData) => resultWrapper(post<unknown, ModuleFormData>('@i18n/module/new', data))

export const dashboard = (path: string) => resultWrapper(get<ModuleDashboard, unknown>(`@i18n/${path}/dashboard`))

export const languages = (path: string) => get<Language[]>(`@i18n/${path}/languages`)

export const deleteModule = (module: string) => resultWrapper(del(`@i18n/${module}`))

export const detail = (module: string) => resultWrapper(get<BaseInfo>(`@i18n/${module}`))

export const update = (data: UpdateInfo) => put<BaseInfo, UpdateInfo>(`@i18n/${data.module}`, data)
