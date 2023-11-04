import {useRecoilState} from "recoil";
import {accountInfoState, isLoginState} from "@/state/account";
import {isLoadingState} from "@/state";
import {useEffect} from "react";
import {profile} from "@/rest/auth";

export const useLayoutState = () => {
    const [account, setAccount] = useRecoilState(accountInfoState);
    const [isLogin, setIsLogin] = useRecoilState(isLoginState);
    const [loading, setLoading] = useRecoilState(isLoadingState);

    const initState = async () => {
        setLoading(true);
        const result = await profile();
        setAccount(result);
        setIsLogin(result.success);
        setLoading(false);
    }

    useEffect(() => {
        initState().then();
    }, [])

    return [loading, isLogin, account];
}
