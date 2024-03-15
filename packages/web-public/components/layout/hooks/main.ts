import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {accountInfoState, isLoginState} from "@clover/public/state/account";
import {isLoadingState, projectsState, teamsState} from "@clover/public/state/public";
import {useCallback, useEffect, useMemo} from "react";
import {profile} from "@clover/public/rest/auth";
import {accessState} from "@easy-kit/common/state/access";
import { useInitLayoutState } from "@clover/public/components/layout/main/hooks";
import { my as myTeams } from "@clover/public/rest/team";
import { my as myProjects } from "@clover/public/rest/project";

export const useCurrent = () => {
    const account = useRecoilValue(accountInfoState);
    return {
        teamId: account?.teamId,
        projectId: account?.projectId
    }
}

export const useDataLoader = () => {
    const setAccount = useSetRecoilState(accountInfoState);
    const setIsLogin = useSetRecoilState(isLoginState);
    const setTeams = useSetRecoilState(teamsState);
    const setProjects = useSetRecoilState(projectsState);
    const setAccess = useSetRecoilState(accessState);

    return useCallback(async () => {
        const { success, data } = await profile();
        success && setAccount(data);
        success && setAccess(data?.authorities || []);
        setIsLogin(success);
        const teamsResult = await myTeams();
        setTeams(teamsResult.success ? teamsResult.data : []);
        const projectsResult = await myProjects();
        setProjects(projectsResult.success ? projectsResult.data : []);
    }, []);
}

export const useLayoutState = () => {
    const init = useInitLayoutState();
    const loadData = useDataLoader();
    const isLogin = useRecoilValue(isLoginState);
    const account = useRecoilValue(accountInfoState);
    const [restLoading, setLoading] = useRecoilState(isLoadingState);

    const initState = async () => {
        setLoading(true);
        await loadData()
        setLoading(false);
    }

    useEffect(() => {
        initState().then();
    }, [])

    const loading = useMemo(() => {
        return restLoading || !init;
    }, [restLoading, init])

    return {loading, isLogin, account};
}
