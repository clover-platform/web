import { atom } from "jotai";
import {Branch, Language} from "@/types/pages/module";
import { CountEntryData, Entry } from "@/types/pages/entry";

export const leftSideOpenState = atom(true)

export const rightSideOpenState = atom(true)

export const languagesState = atom<Language[]>([])

export const branchesState = atom<Branch[]>([])

export const currentLanguageState = atom<string>("")

export const currentBranchState = atom<string>("")

export const entriesState = atom<Entry[]>([])

export const entriesLoadingState = atom<boolean>(false)

export const currentEntryState = atom<number>(0)

export const countState = atom<CountEntryData>({
    total: 0,
    translated: 0,
    verified: 0
})
