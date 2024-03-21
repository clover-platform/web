import { atom } from "recoil";

export const leftSideOpenState = atom({
    key: 'worktop/side/left',
    default: true
})

export const rightSideOpenState = atom({
    key: 'worktop/side/right',
    default: true
})
