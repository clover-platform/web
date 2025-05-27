import { get } from "@clover/public/utils/rest";

export type MemberQuery = {
  module: string;
  keyword?: string;
  type: string;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const list = (params: MemberQuery) => get<any, MemberQuery>(`@i18n/${params.module}/member/list`, params)
