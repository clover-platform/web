import {atom} from "recoil";
import {Catalog} from "@/types/pages/book";

export const catalogState = atom<Catalog[]>({
    key: 'page/catalog',
    default: []
})
