import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { loadProfile } from '@clover/public/components/layout/root/utils'
import { common } from '@clover/public/rest/config'
import type { Account } from '@clover/public/types/account'
import type { CommonConfig } from '@clover/public/types/config'
import type { Project } from '@clover/public/types/project'
import type { Team } from '@clover/public/types/team'

export const SIDEBAR_OPEN_KEY = 'layout.sidebar.open'

export type LoadStateResult = {
  teams: Team[]
  projects: Project[]
  accountInfo?: Account
  isLogin: boolean
  config?: CommonConfig
  theme: string
}

export const loadState = async (): Promise<LoadStateResult> => {
  const { success, teams, projects, profile } = await loadProfile()
  const commonResult = await common()
  const theme = (await getCookie('theme', { cookies })) || 'system'
  return {
    teams,
    projects,
    accountInfo: profile,
    isLogin: success!,
    config: commonResult.success ? commonResult.data : undefined,
    theme,
  }
}
