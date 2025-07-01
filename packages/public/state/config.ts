import type { CommonConfig } from '@clover/public/types/config'
import { atom } from 'jotai'

export const commonConfigState = atom<CommonConfig | undefined>(undefined)