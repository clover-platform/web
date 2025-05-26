import type { Project } from '@clover/public/types/project'
import type { Team } from '@clover/public/types/team'
import { atom } from 'jotai/index'

export const loadedTeamCollectState = atom<boolean>(false)
export const teamCollectState = atom<Team[]>([])

export const loadedProjectCollectState = atom<boolean>(false)
export const projectCollectState = atom<Project[]>([])
