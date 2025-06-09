import { post, resultWrapper } from '@clover/public/utils/rest'
import type { Token } from '@clover/public/utils/token'
import type { EmailFormData, PasswordFormData } from './schema'

export const sendResetEmailCode = (data: { email: string }) =>
  resultWrapper<void>(post<void, { email: string }>('@main/account/reset/email/send', data))

export const resetEmailCheck = (data: EmailFormData) =>
  resultWrapper(post<Token, EmailFormData>('@main/account/reset/email/check', data))

export const passwordReset = (data: PasswordFormData) =>
  resultWrapper<Token>(post<Token, PasswordFormData>('@main/account/reset/password', data))