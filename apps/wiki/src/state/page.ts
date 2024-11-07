import {atom} from "recoil";
import {Catalog} from "@/types/pages/book";

export const catalogState = atom<Catalog[]>({
    key: 'page/catalog',
    default: []
})

export const copyLoadingState = atom<number[]>({
    key: 'page/copy/loading',
    default: []
})
