import { RootLayout as PublicRootLayout } from "@clover/public/components/layout/root";
import { PropsWithChildren } from "react";
import "@/plugin/rest.server";
import "@clover/public/plugin/rest.server";
import '@/assets/style/index.scss';
import {profile} from "@clover/public/rest/auth";
import {my as myTeams} from "@clover/public/rest/team";
import {my as myProjects} from "@clover/public/rest/project";

const RootLayout = async ({children}: PropsWithChildren) => {
    const { success, data } = await profile();
    const teamsResult = await myTeams();
    const projectsResult = await myProjects();
    return <PublicRootLayout
        teams={teamsResult.success ? teamsResult.data : []}
        projects={projectsResult.success ? projectsResult.data : []}
        accountInfo={data}
        isLogin={success}
    >
        {children}
    </PublicRootLayout>
}

export default RootLayout;
