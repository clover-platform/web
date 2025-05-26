import {post} from "@clover/public/utils/rest";

export const sendEmailCode = (data: { action: string }) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, { action: string }>('@main/account/email/code/send', data)
