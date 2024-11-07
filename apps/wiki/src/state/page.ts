import {atom} from "recoil";
import {Catalog} from "@/types/pages/book";

export const catalogLoadingState = atom<string[]>({
    key: 'page/catalog/loading',
    default: []
})

export const catalogState = atom<Record<string, Catalog[]>>({
    key: 'page/catalog',
    default: {}
})

export const copyLoadingState = atom<number[]>({
    key: 'page/copy/loading',
    default: []
})
