import {atom} from "jotai/index";
import {Team} from "@clover/public/types/team";
import {Project} from "@clover/public/types/project";

export const loadedTeamCollectState = atom<boolean>(false);
export const teamCollectState = atom<Team[]>([]);

export const loadedProjectCollectState = atom<boolean>(false);
export const projectCollectState = atom<Project[]>([]);
