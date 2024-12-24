import {getCookie} from "cookies-next";
import {SIDEBAR_OPEN_KEY} from "@clover/public/components/layout/main/const";
import {cookies} from "next/headers";
import {loadProfile} from "@clover/public/components/layout/root/utils";

export const loadState = async () => {
    const { success, teams, projects, profile} = await loadProfile();
    const open = await getCookie(SIDEBAR_OPEN_KEY, {cookies});
    return {
        teams,
        projects,
        accountInfo: profile,
        isLogin: success,
        sideOpen: !(open === 'false')
    }
}
