import { post, resultWrapper } from '@clover/public/utils/rest'
import type { PasswordFormData } from '@/config/schema/security/password'

export const change = (data: PasswordFormData) =>
  resultWrapper(post<unknown, PasswordFormData>('@main/account/password/change', data))
