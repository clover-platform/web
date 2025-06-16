import type { MemberInviteFormData } from '@/config/schema/module/member'
import type { InviteDetail } from '@/types/module'
import type { MemberInvite } from '@/types/module/member'
import { del, get, post, resultWrapper } from '@clover/public/utils/rest'

export type InviteGenerateData = {
  module: string
  roles: string[]
}

export const generate = (data: InviteGenerateData) =>
  resultWrapper(post<string, InviteGenerateData>(`@i18n/${data.module}/member/invite/generate`, data))

export type InviteGenerateParams = {
  module: string
}

export const list = (module: string) =>
  resultWrapper(get<MemberInvite[], unknown>(`@i18n/${module}/member/invite/list`))

export type RevokeInviteParams = {
  module: string
  id: number
}
export const revoke = (params: RevokeInviteParams) =>
  resultWrapper(del<unknown, RevokeInviteParams>(`@i18n/${params.module}/member/invite/revoke`, params))

export type MemberInviteData = {
  module: string
} & MemberInviteFormData

export const send = (data: MemberInviteData) =>
  resultWrapper(post<unknown, MemberInviteData>(`@i18n/${data.module}/member/invite/send`, data))

export type AcceptInviteData = {
  token: string
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const accept = (data: AcceptInviteData) => post<any, AcceptInviteData>('@i18n/member/invite/accept', data)

export const detail = (token: string) => get<InviteDetail | string>(`@i18n/member/invite/detail/${token}`)
