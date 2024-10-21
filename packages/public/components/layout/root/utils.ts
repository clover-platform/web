import {profile} from "@clover/public/rest/auth";
import {my as myTeams} from "@clover/public/rest/team";
import {my as myProjects} from "@clover/public/rest/project";
import {getCookie} from "cookies-next";
import {SIDEBAR_OPEN_KEY} from "@clover/public/components/layout/main/const";
import {cookies} from "next/headers";

export const loadState = async () => {
    const { success, data } = await profile();
    let teams = [];
    let projects = [];
    if(success) {
        const teamsResult = await myTeams();
        teams = teamsResult.success ? teamsResult.data : [];
        const projectsResult = await myProjects();
        projects = projectsResult.success ? projectsResult.data : [];
    }
    const open = getCookie(SIDEBAR_OPEN_KEY, {cookies});
    return {
        teams,
        projects,
        accountInfo: data,
        isLogin: success,
        sideOpen: !(open === 'false')
    }
}
