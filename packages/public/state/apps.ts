import type { AppsItemProps } from '@clover/public/rest/config'
import { atom } from 'jotai'

export const loadingState = atom<boolean>(true)

export const appsState = atom<AppsItemProps[]>([])
