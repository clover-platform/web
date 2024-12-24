import {useCallback} from "react";
import {loadProfile} from "@clover/public/components/layout/root/utils";
import {useAtom} from "jotai/index";
import {projectsState, teamsState} from "@clover/public/state/public";
import {accountInfoState, isLoginState} from "@clover/public/state/account";

export const useStateLoader = () => {
    const [teams, setTeams] = useAtom(teamsState);
    const [projects, setProjects] = useAtom(projectsState);
    const [profile, setProfile] = useAtom(accountInfoState);
    const [isLogin, setIsLogin] = useAtom(isLoginState);
    return useCallback(async () => {
        const { teams, projects, profile, success } = await loadProfile();
        setTeams(teams);
        setProjects(projects);
        setProfile(profile!);
        setIsLogin(success);
    }, [])
}
