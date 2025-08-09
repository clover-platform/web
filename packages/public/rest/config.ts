import type { AppsItem, CommonConfig } from '../types/config'

import { get } from '@clover/public/utils/rest'

export const apps = () => get<AppsItem[]>('@main/config/app/list')

export const common = () => get<CommonConfig>('@main/config/common')
