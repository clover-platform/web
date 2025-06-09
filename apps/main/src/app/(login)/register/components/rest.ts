import { post, resultWrapper } from '@clover/public/utils/rest'
import type { Token } from '@clover/public/utils/token'
import type { RegisterFormData } from './schema'

export const sendEmailCode = (data: { email: string }) =>
  resultWrapper<void>(post<void, { email: string }>('@main/account/register/email/send', data))

export const register = (data: RegisterFormData) =>
  resultWrapper<Token>(post<Token, RegisterFormData>('@main/account/register', data))