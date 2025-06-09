import { post, resultWrapper } from '@clover/public/utils/rest'

export type SendEmailCodeData = {
  action: string
  email: string
}

export const sendEmailCode = (data: SendEmailCodeData) =>
  resultWrapper<unknown>(post<unknown, SendEmailCodeData>('@main/account/email/code/send', data))
