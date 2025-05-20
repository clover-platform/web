import { get } from "@clover/public/utils/rest";

export type MemberQuery = {
  module: string;
  keyword?: string;
  type: string;
}

export const list = (params: MemberQuery) =>
  get<any, MemberQuery>(`@i18n/${params.module}/member/list`, params);
