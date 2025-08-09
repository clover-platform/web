import { atom } from 'jotai'
import type { Account } from '@clover/public/types/account'

export const isLoginState = atom(false)

export const accountInfoState = atom<Account>({
  id: 0,
  email: '',
  username: '',
  authorities: [],
  currentProjectId: 0,
  currentTeamId: 0,
})
