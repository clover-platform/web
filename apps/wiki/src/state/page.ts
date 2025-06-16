import type { Catalog } from '@/types/module/book'
import { atom } from 'jotai'

export const catalogLoadingState = atom<string[]>([])

export const catalogState = atom<Record<string, Catalog[]>>({})

export const copyLoadingState = atom<number[]>([])
