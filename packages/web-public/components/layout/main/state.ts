import { atom } from "recoil";

export const sidebarOpenState = atom({
    key: 'layout.admin.sidebar.open',
    default: true
})

export const loadingState = atom({
    key: 'layout.admin.loading',
    default: false
})
