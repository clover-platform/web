import { loadProfile } from '@clover/public/components/layout/root/utils'
import {getCookie} from "cookies-next";
import { cookies } from 'next/headers'

export const SIDEBAR_OPEN_KEY = "layout.sidebar.open";

export type LoadStateResult = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  teams: any[]
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  projects: any[]
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  accountInfo?: any
  isLogin: boolean
  sideOpen: boolean
}

export const loadState = async (): Promise<LoadStateResult> => {
  const {success, teams, projects, profile} = await loadProfile();
  const open = await getCookie(SIDEBAR_OPEN_KEY, {cookies});
  return {
    teams,
    projects,
    accountInfo: profile,
    isLogin: success!,
    sideOpen: !(open === 'false'),
  }
}
