import type { Account } from '@clover/public/types/account'
import { atom } from 'jotai'

export const isLoginState = atom(false)

export const accountInfoState = atom<Account>({
  id: 0,
  email: '',
  username: '',
  authorities: [],
  currentProjectId: 0,
  currentTeamId: 0,
})
