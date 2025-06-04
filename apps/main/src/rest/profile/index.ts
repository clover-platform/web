import type { Account } from '@clover/public/types/account'
import { get, put } from '@clover/public/utils/rest'

export const profile = (username: string) => get<Account, undefined>(`@main/account/profile/${username}`)

export type UpdateReadmeData = {
  content: string
}
export const updateReadme = (data: UpdateReadmeData) =>
  put<undefined, UpdateReadmeData>('@main/account/readme/update', data)