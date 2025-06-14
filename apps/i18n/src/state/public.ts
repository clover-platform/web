import type { Language } from '@/types/module'
import { atom } from 'jotai'

export const languagesState = atom<Language[]>([]) 
