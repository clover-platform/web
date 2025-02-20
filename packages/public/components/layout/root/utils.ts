import {profile} from "@clover/public/rest/auth";
import {my as myTeams} from "@clover/public/rest/team";
import {my as myProjects} from "@clover/public/rest/project";

export const loadProfile = async () => {
    const { success, data } = await profile();
    let teams = [];
    let projects = [];
    if(success) {
        const teamsResult = await myTeams();
        teams = teamsResult.success ? teamsResult.data : [];
        const projectsResult = await myProjects();
        projects = projectsResult.success ? projectsResult.data : [];
    }
    return {
        profile: data, teams, projects, success
    };
}
