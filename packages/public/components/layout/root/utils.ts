import { profile } from '@clover/public/rest/auth'
import {my as myProjects} from "@clover/public/rest/project";
import { my as myTeams } from '@clover/public/rest/team'
import type { Project } from '@clover/public/types/project'
import type { Team } from '@clover/public/types/team'

export const loadProfile = async () => {
  const {success, data} = await profile();
  let teams: Team[] = []
  let projects: Project[] = []
  if (success) {
    const teamsResult = await myTeams()
    teams = teamsResult.success ? teamsResult.data! : [] 
    const projectsResult = await myProjects()
    projects = projectsResult.success ? projectsResult.data! : []
  } 
  return {
    profile: data, teams, projects, success
  };
}
