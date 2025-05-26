import type { PageResult } from '@clover/public/types/rest'
import type { Team } from '@clover/public/types/team'
import { del, get, post } from '@clover/public/utils/rest'

export type CreateTeamData = {
  cover?: string
  name: string
  teamKey: string
}

export const create = (data: CreateTeamData) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  post<any, CreateTeamData>('@main/team/create', data)

export type ListParams = {
  keyword: string
  page: number
  size: number
}

export type ListResult = PageResult<Team>

export const list = (params: ListParams) => get<ListResult, ListParams>('@main/team/list', params)

export const deleteTeam = (id: number) => del(`@main/team/${id}`)

export const myCollect = () => get<Team[]>('@main/team/collect/my')

export const addCollect = (id: number) => post('@main/team/collect/add', { id })

export const cancelCollect = (id: number) => del('@main/team/collect/cancel', { id })
