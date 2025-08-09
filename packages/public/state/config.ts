import { atom } from 'jotai'
import type { CommonConfig } from '@clover/public/types/config'

export const commonConfigState = atom<CommonConfig | undefined>(undefined)
