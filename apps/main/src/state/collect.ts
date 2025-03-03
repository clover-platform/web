import {atom} from "jotai/index";
import {Team} from "@clover/public/types/team";

export const initTeamCollectState = atom<boolean>(false);
export const teamCollectState = atom<Team[]>([]);
