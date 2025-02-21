import {useCallback} from "react";
import {loadProfile} from "@clover/public/components/layout/root/utils";
import {useSetAtom} from "jotai";
import {projectsState, teamsState} from "@clover/public/state/public";
import {accountInfoState, isLoginState} from "@clover/public/state/account";

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
    setIsLogin(success!);
  }, [setIsLogin, setProfile, setProjects, setTeams])
}
