import type { InviteDetail } from '@/types/module'
import type { MemberInvite } from '@/types/module/member'
import { del, get, post } from '@clover/public/utils/rest'

export type InviteGenerateData = {
  module: string
  roles: string[]
}

export const generate = (data: InviteGenerateData) =>
  post<string, InviteGenerateData>(`@i18n/${data.module}/member/invite/generate`, data)

export type InviteGenerateParams = {
  module: string
}

export const list = (params: InviteGenerateParams) =>
  get<MemberInvite[], InviteGenerateParams>(`@i18n/${params.module}/member/invite/list`, params)

export const revoke = (params: { module: string; id: number }) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  del<any, any>(`@i18n/${params.module}/member/invite/revoke`, params)

export type MemberInviteData = {
  module: string
  roles: string[]
  emails: string
  content: string
}

export const send = (data: MemberInviteData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, MemberInviteData>(`@i18n/${data.module}/member/invite/send`, data)

export type AcceptInviteData = {
  token: string
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const accept = (data: AcceptInviteData) => post<any, AcceptInviteData>('@i18n/member/invite/accept', data)

export const detail = (token: string) => get<InviteDetail | string>(`@i18n/member/invite/detail/${token}`)
