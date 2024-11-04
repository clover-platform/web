import {atom} from "recoil";

export const loadingState = atom<number[]>({
    key: 'collect/loading',
    default: []
})

export const collectedState = atom<number[]>({
    key: 'collect/list',
    default: []
})
