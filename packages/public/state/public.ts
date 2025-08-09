import { atom } from 'jotai'
import type { Project } from '@clover/public/types/project'
import type { Team } from '@clover/public/types/team'

export const teamsState = atom<Team[]>([])

export const projectsState = atom<Project[]>([])

export const localeState = atom<string>('zh-cn')
