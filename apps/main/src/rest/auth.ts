import type { RegisterFormData } from '@/config/schema/register'
import { get, post, resultWrapper } from '@clover/public/utils/rest'
import type { Token } from '@clover/public/utils/token'

export const sendEmailCode = (data: { email: string }) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, { email: string }>('@main/account/register/email/send', data)

export const register = (data: RegisterFormData) =>
  resultWrapper<Token>(post<Token, RegisterFormData>('@main/account/register', data))

export const sendResetEmailCode = (data: { email: string }) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, { email: string }>('@main/account/reset/email/send', data)

type ResetEmailCheckData = {
  email: string
  code: string
}
export const resetEmailCheck = (data: ResetEmailCheckData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, ResetEmailCheckData>('@main/account/reset/email/check', data)

type PasswordResetData = {
  password: string
}
export const passwordReset = (data: PasswordResetData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, PasswordResetData>('@main/account/reset/password', data)

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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const otpSecret = () => get<any>('@main/account/otp/secret')

export type OTPStatus = {
  enable: boolean
  enableTime: number
}

export const otpStatus = () => get<OTPStatus>('@main/account/otp/status')

export type OTPBindData = {
  code: string
  otpCode: string
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const otpBind = (data: OTPBindData) => post<any, OTPBindData>('@main/account/otp/bind', data)

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const otpDisable = (data: { code: string }) => post<any, { code: string }>('@main/account/otp/disable', data)
