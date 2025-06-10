import type { Project } from '@clover/public/types/project'
import type { PageData } from '@clover/public/types/rest'
import { del, get, post, resultWrapper } from '@clover/public/utils/rest'

export type ProjectListParams = {
  type: string
  teamId?: number
  keyword?: string
  page?: number
  size?: number
}

export const list = (params: ProjectListParams) =>
  resultWrapper(get<PageData<Project>, ProjectListParams>('@main/project/list', params))

export type CreateProjectData = {
  cover?: string
  name: string
  projectKey: string
  teamId: string
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const create = (data: CreateProjectData) => post<any, CreateProjectData>('@main/project/create', data)

export const deleteProject = (id: number) => resultWrapper(del(`@main/project/${id}`))

export const addCollect = (id: number) => resultWrapper(post('@main/project/collect/add', { id }))

export const cancelCollect = (id: number) => resultWrapper(del('@main/project/collect/cancel', { id }))
