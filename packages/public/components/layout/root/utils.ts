import { profile } from '@clover/public/rest/auth'
import {my as myProjects} from "@clover/public/rest/project";
import { my as myTeams } from '@clover/public/rest/team'

export const loadProfile = async () => {
  const {success, data} = await profile();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let teams: any[] = []
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let projects: any[] = []
  if (success) {
    const teamsResult = await myTeams()
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    teams = teamsResult.success ? (teamsResult.data as any[]) : []
    const projectsResult = await myProjects()
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    projects = projectsResult.success ? (projectsResult.data as any[]) : []
  } 
  return {
    profile: data, teams, projects, success
  };
}
