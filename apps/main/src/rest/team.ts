import type { TeamFormData } from '@/config/schema/team'
import type { PageData } from '@clover/public/types/rest'
import type { Team } from '@clover/public/types/team'
import { del, get, post, resultWrapper } from '@clover/public/utils/rest'

export const myCollect = () => get<Team[]>('@main/team/collect/my')

export const create = (data: TeamFormData) => resultWrapper(post<unknown, TeamFormData>('@main/team/create', data))

export type ListParams = {
  type: string
  keyword?: string
  page?: number
  size?: number
}

export const list = (params: ListParams) => resultWrapper(get<PageData<Team>, ListParams>('@main/team/list', params))

export const deleteTeam = (id: number) => resultWrapper(del(`@main/team/${id}`))

export const addCollect = (id: number) => resultWrapper(post('@main/team/collect/add', { id }))

export const cancelCollect = (id: number) => resultWrapper(del('@main/team/collect/cancel', { id }))
