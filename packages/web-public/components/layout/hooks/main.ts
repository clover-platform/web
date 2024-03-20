import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {accountInfoState, isLoginState} from "@clover/public/state/account";
import {isLoadingState, projectsState, teamsState} from "@clover/public/state/public";
import {useCallback, useEffect} from "react";
import {profile} from "@clover/public/rest/auth";
import {accessState} from "@easy-kit/common/state/access";
import { my as myTeams } from "@clover/public/rest/team";
import { my as myProjects } from "@clover/public/rest/project";
import {usePathname, useRouter} from "next/navigation";
import bus from "@easy-kit/common/events";
import {UNAUTHORIZED} from "@clover/public/events/auth";
import localforage from "localforage";
import {SIDEBAR_OPEN_KEY} from "@clover/public/components/layout/main/const";
import {sidebarOpenState} from "@clover/public/components/layout/main/state";

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
    const loadData = useDataLoader();
    const isLogin = useRecoilValue(isLoginState);
    const account = useRecoilValue(accountInfoState);
    const [loading, setLoading] = useRecoilState(isLoadingState);
    const setSidebarOpen = useSetRecoilState(sidebarOpenState);

    const initState = async () => {
        setLoading(true);
        await loadData()
        const sideInit = await localforage.getItem<boolean>(SIDEBAR_OPEN_KEY);
        setSidebarOpen(sideInit === null ? true: sideInit);
        setLoading(false);
    }

    useEffect(() => {
        initState().then();
    }, [])

    return {loading, isLogin, account};
}

export const useGoLogin = () => {
    const router = useRouter();
    const isLogin = useRecoilValue(isLoginState);
    const loading = useRecoilValue(isLoadingState);
    const goLogin = () => {
        router.push(`/{#LANG#}/login/?from=${encodeURIComponent(location.href)}`)
    }

    useEffect(() => {
        bus.on(UNAUTHORIZED, goLogin);
        return () => {
            bus.off(UNAUTHORIZED, goLogin);
        }
    }, []);

    useEffect(() => {
        if (!loading && !isLogin) {
            goLogin();
        }
    }, [loading, isLogin]);
}
