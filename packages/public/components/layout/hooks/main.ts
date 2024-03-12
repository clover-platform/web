import {useRecoilState, useSetRecoilState} from "recoil";
import {accountInfoState, isLoginState} from "@clover/public/state/account";
import {isLoadingState, teamsState} from "@clover/public/state/public";
import { useEffect, useMemo } from "react";
import {profile} from "@clover/public/rest/auth";
import {accessState} from "@easy-kit/common/state/access";
import { useInitLayoutState } from "@clover/public/components/layout/main/hooks";
import { my as myTeams } from "@clover/public/rest/team";

export const useLayoutState = () => {
    const init = useInitLayoutState();
    const [account, setAccount] = useRecoilState(accountInfoState);
    const [isLogin, setIsLogin] = useRecoilState(isLoginState);
    const [restLoading, setLoading] = useRecoilState(isLoadingState);
    const setAccess = useSetRecoilState(accessState);
    const setTeams = useSetRecoilState(teamsState);

    const initState = async () => {
        setLoading(true);
        const { success, data } = await profile();
        success && setAccount(data);
        success && setAccess(data?.authorities || []);
        setIsLogin(success);
        const teamsResult = await myTeams();
        setTeams(teamsResult.success ? teamsResult.data : []);
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
