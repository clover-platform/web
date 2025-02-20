import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import {loadProfile} from "@clover/public/components/layout/root/utils";

export const SIDEBAR_OPEN_KEY = "layout.sidebar.open";

export type LoadStateResult = {
    teams: any[];
    projects: any[];
    accountInfo?: any;
    isLogin: boolean;
    sideOpen: boolean;
}

export const loadState = async (): Promise<LoadStateResult> => {
    const { success, teams, projects, profile } = await loadProfile();
    const open = await getCookie(SIDEBAR_OPEN_KEY, {cookies});
    return {
        teams,
        projects,
        accountInfo: profile,
        isLogin: success!,
        sideOpen: !(open === 'false'),
    }
}
