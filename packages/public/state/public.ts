import {atom} from "jotai";
import {Team} from "@clover/public/types/team";
import {Project} from "@clover/public/types/project";

export const teamsState = atom<Team[]>([])

export const projectsState = atom<Project[]>([])

export const localeState = atom<string>("zh-cn")
