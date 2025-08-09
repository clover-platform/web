import type { PageData } from '@clover/public/types/rest'
import { del, get, post, resultWrapper } from '@clover/public/utils/rest'
import type { AccessToken } from '@/types/profile/access/token'

export type ListParams = {
  page?: number
  size?: number
}

export const list = (params: ListParams) =>
  resultWrapper<PageData<AccessToken>>(
    get<PageData<AccessToken>, ListParams>('@main/account/access/token/list', params)
  )

export type CreateData = {
  name: string
  expirationTime?: number
}

export const create = (data: CreateData) =>
  resultWrapper(post<string, CreateData>('@main/account/access/token/create', data))

export const revoke = (id: number) => resultWrapper(del(`@main/account/access/token/${id}/revoke`))
