import { loadProfile } from '@clover/public/components/layout/root/utils'
import type { Account } from '@clover/public/types/account'
import type { Project } from '@clover/public/types/project'
import type { Team } from '@clover/public/types/team'

export const SIDEBAR_OPEN_KEY = "layout.sidebar.open";

export type LoadStateResult = {
  teams: Team[]
  projects: Project[]
  accountInfo?: Account
  isLogin: boolean
}

export const loadState = async (): Promise<LoadStateResult> => {
  const { success, teams, projects, profile } = await loadProfile()
  return {
    teams,
    projects,
    accountInfo: profile,
    isLogin: success!,
  }
}
