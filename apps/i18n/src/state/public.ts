import { atom } from "recoil";
import { Language } from "@/types/pages/public";

export const languagesState = atom<Language[]>({
    key: 'public/languages',
    default: []
})

export const languagesLoadingState = atom<boolean>({
    key: 'public/languages/loading',
    default: true,
})
