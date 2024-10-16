import {atom} from "recoil";

export const teamsState = atom<any[]>({
    key: 'public/teams',
    default: []
})

export const projectsState = atom<any[]>({
    key: 'public/projects',
    default: []
})

export const localeState = atom<string>({
    key: 'public/locale',
    default: "zh-cn"
})
