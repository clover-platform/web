import type { Branch, Language } from '@/types/module'
import type { CountEntryData, Entry } from '@/types/pages/entry'
import { atom } from 'jotai'

export const leftSideOpenState = atom(true)

export const rightSideOpenState = atom(true)

export const languagesState = atom<Language[]>([])

export const branchesState = atom<Branch[]>([])

export const currentLanguageState = atom<string>('')

export const currentBranchState = atom<string>('')

export const entriesState = atom<Entry[]>([])

export const entriesLoadingState = atom<boolean>(false)

export const currentEntryState = atom<number>(0)

export const currentPageState = atom<number>(1)

export const countState = atom<CountEntryData>({
  total: 0,
  translated: 0,
  verified: 0,
})
