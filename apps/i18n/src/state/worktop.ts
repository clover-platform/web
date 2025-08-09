import { atom } from 'jotai'
import type { CountEntryData, Entry } from '@/types/module/entry'
import type { File } from '@/types/module/source'
import type { Language } from '@/types/public'

export const leftSideOpenState = atom(true)

export const rightSideOpenState = atom(true)

export const languagesState = atom<Language[]>([])

export const filesState = atom<File[]>([])

export const currentLanguageState = atom<string>('')

export const currentFileState = atom<string>('')

export const entriesState = atom<Entry[]>([])

export const entriesLoadingState = atom<boolean>(false)

export const currentEntryState = atom<number>(0)

export const currentPageState = atom<number>(1)

export const countState = atom<CountEntryData>({
  total: 0,
  translated: 0,
  verified: 0,
})
