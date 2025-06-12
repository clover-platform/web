import type { PasswordFormData } from '@/config/schema/security/password'
import { post, resultWrapper } from '@clover/public/utils/rest'

export const change = (data: PasswordFormData) =>
  resultWrapper(post<unknown, PasswordFormData>('@main/account/password/change', data))
