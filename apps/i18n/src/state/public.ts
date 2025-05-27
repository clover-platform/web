import type { Language } from '@/types/pages/public'
import { atom } from 'jotai'

export const languagesState = atom<Language[]>([]) 
