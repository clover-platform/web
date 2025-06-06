import type { Project } from '@clover/public/types/project'
import { get, post, put } from '@clover/public/utils/rest'
import type { Team } from '../types/team'

export const my = () => get<Team[]>('@main/team/my')

export type TeamInitData = {
  name: string
  projectName: number
}
export const init = (data: TeamInitData) => post('@main/team/init', data)

export const myByTeamId = (teamId: number | string) => get<Project[]>(`@main/team/${teamId}/projects`)

export type ChangeTeamData = {
  teamId: number | string
  projectId: number | string
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const change = (data?: ChangeTeamData) => put<any, ChangeTeamData>('@main/team/change', data)
