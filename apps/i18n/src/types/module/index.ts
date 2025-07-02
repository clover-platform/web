import type { Language, LanguageWithCount } from '../public'

export type Module = {
  id: number
  name: string
  ownerId: number
  projectId: number
  createTime: string
  updateTime?: string
  description?: string
  identifier?: string
  memberSize?: number
  targetSize?: number
  source: string
  wordSize?: number
  collected?: boolean
}

export type ModuleCount = {
  wordCount: number
  branchCount: number
  memberCount: number
  targetCount: number
}

export type ModuleDetail = {
  id?: number
  source?: string
  createTime?: string
  updateTime?: string
}

export type InviteDetail = {
  identifier: string
  name: string
  description?: string
  source: string
  roles: string[]
  targets: Language[]
}

export type BaseInfo = {
  id?: number
  name?: string
  description?: string
  identifier?: string
  languages?: LanguageWithCount[]
}

export type UpdateInfo = {
  module?: string
  name?: string
  description?: string
}
