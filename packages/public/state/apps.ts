import { atom } from 'jotai'
import type { AppsItem } from '@clover/public/types/config'

export const loadingState = atom<boolean>(true)

export const appsState = atom<AppsItem[]>([])
