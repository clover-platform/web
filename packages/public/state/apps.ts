import type { AppsItem } from '@clover/public/types/config'
import { atom } from 'jotai'

export const loadingState = atom<boolean>(true)

export const appsState = atom<AppsItem[]>([])
