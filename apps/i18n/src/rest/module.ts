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

export const all = (params: { keyword?: string }) => get<Module[], { keyword?: string }>('@i18n/module/all', params)

export const create = (data: ModuleFormData) => resultWrapper(post<unknown, ModuleFormData>('@i18n/module/new', data))

export const dashboard = (path: string) => resultWrapper(get<ModuleDashboard, unknown>(`@i18n/${path}/dashboard`))

export const languages = (module: string) => resultWrapper(get<Language[]>(`@i18n/${module}/languages`))

export const deleteModule = (module: string) => resultWrapper(del(`@i18n/${module}`))

export const detail = (module: string) => resultWrapper(get<BaseInfo>(`@i18n/${module}`))

export const update = (data: UpdateInfo) => put<BaseInfo, UpdateInfo>(`@i18n/${data.module}`, data)

export const myCollect = () => resultWrapper(get<Module[]>('@i18n/module/collect/my'))

export const addCollect = (module: string) => resultWrapper(post<unknown, unknown>(`@i18n/${module}/collect/add`))

export const cancelCollect = (module: string) => resultWrapper(del<unknown, unknown>(`@i18n/${module}/collect/cancel`))
