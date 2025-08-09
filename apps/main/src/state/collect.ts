import { atom } from 'jotai/index'
import type { Project } from '@clover/public/types/project'
import type { Team } from '@clover/public/types/team'

export const loadedTeamCollectState = atom<boolean>(false)
export const teamCollectState = atom<Team[]>([])

export const loadedProjectCollectState = atom<boolean>(false)
export const projectCollectState = atom<Project[]>([])
