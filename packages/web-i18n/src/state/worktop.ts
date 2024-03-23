import { atom } from "recoil";
import {Branch, Language} from "@/types/pages/module";
import {Entry} from "@/types/pages/entry";

export const leftSideOpenState = atom({
    key: 'worktop/side/left',
    default: true
})

export const rightSideOpenState = atom({
    key: 'worktop/side/right',
    default: true
})

export const languagesState = atom<Language[]>({
    key: 'worktop/languages',
    default: []
})

export const branchesState = atom<Branch[]>({
    key: 'worktop/branches',
    default: []
})

export const currentLanguageState = atom<string>({
    key: 'worktop/languages/current',
    default: ""
})

export const currentBranchState = atom<string>({
    key: 'worktop/branches/current',
    default: ""
})

export const entriesState = atom<Entry[]>({
    key: 'worktop/entries',
    default: []
})

export const entriesLoadingState = atom<boolean>({
    key: 'worktop/entries/loading',
    default: false
})

export const currentEntryState = atom<number>({
    key: 'worktop/entries/current',
    default: 0
})
