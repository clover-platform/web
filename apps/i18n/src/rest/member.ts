import type { PageData } from '@clover/public/types/rest'
import { get, resultWrapper } from '@clover/public/utils/rest'
import type { Member } from '@/types/module/member'

export type MemberQuery = {
  module?: string
  keyword?: string
  type: string
}

export const list = (params: MemberQuery) =>
  resultWrapper(get<PageData<Member>, MemberQuery>(`@i18n/${params.module}/member/list`, params))
