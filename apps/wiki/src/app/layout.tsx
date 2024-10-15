import { RootLayout as PublicRootLayout } from "@clover/public/components/layout/root";
import { PropsWithChildren } from "react";
import "@/plugin/rest.server";
import "@clover/public/plugin/rest.server";
import '@/assets/style/index.scss';
import {profile} from "@clover/public/rest/auth";
import {my as myTeams} from "@clover/public/rest/team";
import {my as myProjects} from "@clover/public/rest/project";
import { getCookie } from "cookies-next";
import { cookies } from 'next/headers';
import {SIDEBAR_OPEN_KEY} from "@clover/public/components/layout/main/const";

const RootLayout = async ({children}: PropsWithChildren) => {
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

    return <PublicRootLayout
        teams={teams}
        projects={projects}
        accountInfo={data}
        isLogin={success}
        sideOpen={!(open === 'false')}
    >
        {children}
    </PublicRootLayout>
}

export default RootLayout;
