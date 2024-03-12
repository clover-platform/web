import {useRecoilState} from "recoil";
import {accountInfoState, isLoginState} from "@clover/public/state/account";
import {isLoadingState} from "@clover/public/state";
import { useEffect, useMemo } from "react";
import {profile} from "@clover/public/rest/auth";
import {accessState} from "@easy-kit/common/state/access";
import { useInitLayoutState } from "@clover/public/components/layout/main/hooks";

export const useLayoutState = () => {
    const init = useInitLayoutState();
    const [account, setAccount] = useRecoilState(accountInfoState);
    const [isLogin, setIsLogin] = useRecoilState(isLoginState);
    const [restLoading, setLoading] = useRecoilState(isLoadingState);
    const [_, setAccess] = useRecoilState(accessState);

    const initState = async () => {
        setLoading(true);
        const { success, data } = await profile();
        success && setAccount(data);
        success && setAccess(data.authorities);
        setIsLogin(success);
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
