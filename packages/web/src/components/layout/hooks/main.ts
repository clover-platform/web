import {useRecoilState} from "recoil";
import {accountInfoState, isLoginState} from "@/state/account";
import {isLoadingState} from "@/state";
import {useEffect} from "react";
import {profile} from "@/rest/auth";
import {accessState} from "@easy-kit/common/state/access";

export const useLayoutState = () => {
    const [account, setAccount] = useRecoilState(accountInfoState);
    const [isLogin, setIsLogin] = useRecoilState(isLoginState);
    const [loading, setLoading] = useRecoilState(isLoadingState);
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

    return [loading, isLogin, account];
}
