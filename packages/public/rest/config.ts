import { get } from '@clover/public/utils/rest'
import type { AppsItem, CommonConfig } from '../types/config'

export const apps = () => get<AppsItem[]>('@main/config/app/list')

export const common = () => get<CommonConfig>('@main/config/common')