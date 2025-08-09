import { atom } from 'jotai'
import type { Language } from '@/types/public'

export const languagesState = atom<Language[]>([])
