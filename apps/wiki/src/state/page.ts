import {atom} from "jotai";
import {Catalog} from "@/types/pages/book";

export const catalogLoadingState = atom<string[]>([])

export const catalogState = atom<Record<string, Catalog[]>>({})

export const copyLoadingState = atom<number[]>([])
