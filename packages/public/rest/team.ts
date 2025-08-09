import type { TeamInitFormData } from '../config/schema/layout/guide'
import type { Team } from '../types/team'

import type { Project } from '@clover/public/types/project'
import { get, post, put, resultWrapper } from '@clover/public/utils/rest'

export const my = () => get<Team[]>('@main/team/my')

export const init = (data: TeamInitFormData) => resultWrapper(post('@main/team/init', data))

export const myByTeamId = (teamId: number | string) => get<Project[]>(`@main/team/${teamId}/projects`)

export type ChangeTeamData = {
  teamId: number | string
  projectId: number | string
}

// biome-ignore lint/suspicious/noExplicitAny: result
export const change = (data?: ChangeTeamData) => put<any, ChangeTeamData>('@main/team/change', data)
