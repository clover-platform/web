import type { Language } from '@/types/public'
import { atom } from 'jotai'

export const languagesState = atom<Language[]>([]) 
