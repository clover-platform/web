import type { Project } from '@clover/public/types/project'
import type { PageData } from '@clover/public/types/rest'
import { del, get, post, resultWrapper } from '@clover/public/utils/rest'

export const myCollect = () => get<Project[]>('@main/project/collect/my')

export type ProjectListParams = {
  type: string
  teamId?: number
  keyword?: string
  page?: number
  size?: number
}

export const list = (params: ProjectListParams) =>
  resultWrapper(get<PageData<Project>, ProjectListParams>('@main/project/list', params))

export type RecentParams = {
  keyword?: string
  page?: number
  size?: number
}

export const recent = (params: RecentParams) =>
  resultWrapper(get<PageData<Project>, RecentParams>('@main/project/recent', params))

export type CreateProjectData = {
  cover?: string
  name: string
  projectKey: string
  teamId: string
}

export const create = (data: CreateProjectData) =>
  resultWrapper(post<unknown, CreateProjectData>('@main/project/create', data))

export const deleteProject = (id: number) => resultWrapper(del(`@main/project/${id}`))

export const leaveProject = (id: number) => resultWrapper(del(`@main/project/${id}/leave`))

export const addCollect = (id: number) => resultWrapper(post('@main/project/collect/add', { id }))

export const cancelCollect = (id: number) => resultWrapper(del('@main/project/collect/cancel', { id }))
