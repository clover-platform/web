import { get, post } from '@clover/public/utils/rest'

type LinkCodeData = {
  type?: string
  code: string
}
export const linkCode = (data: LinkCodeData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  get<any, LinkCodeData>(`@account/auth/link/${data.type}/code`, { code: data.code })

type LoginAndLinkData = {
  account: string
  password: string
  token: string
}
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const loginAndLink = (data: LoginAndLinkData) => post<any, LoginAndLinkData>('@main/account/link/bind', data)
