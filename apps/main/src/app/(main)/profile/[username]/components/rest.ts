import type { Account } from '@clover/public/types/account'
import { get, resultWrapper } from '@clover/public/utils/rest'

export const profile = (username: string) =>
  resultWrapper<Account>(get<Account, undefined>(`@main/account/profile/${username}`))