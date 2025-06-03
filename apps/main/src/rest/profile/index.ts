import type { Account } from '@clover/public/types/account'
import { get } from '@clover/public/utils/rest'

export const profile = (username: string) => get<Account, undefined>(`@main/account/profile/${username}`)