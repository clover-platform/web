import { loadProfile } from '@clover/public/components/layout/root/utils'
import {accountInfoState, isLoginState} from "@clover/public/state/account";
import { projectsState, teamsState } from '@clover/public/state/public'
import { useSetAtom } from 'jotai'
import { useCallback } from 'react'

export const useStateLoader = () => {
  const setTeams = useSetAtom(teamsState);
  const setProjects = useSetAtom(projectsState);
  const setProfile = useSetAtom(accountInfoState);
  const setIsLogin = useSetAtom(isLoginState);
  return useCallback(async () => {
    const {teams, projects, profile, success} = await loadProfile();
    setTeams(teams);
    setProjects(projects);
    setProfile(profile!);
    setIsLogin(success!)
  }, [setIsLogin, setProfile, setProjects, setTeams])
}
