import {atom} from "recoil";

export const isLoadingState = atom({
    key: 'public/loading',
    default: true
})

export const teamsState = atom<any[]>({
    key: 'public/teams',
    default: []
})

export const projectsState = atom<any[]>({
    key: 'public/projects',
    default: []
})
