import {useRecoilValue} from "recoil";
import {accountInfoState, isLoginState} from "@clover/public/state/account";
import {useRouter} from "next/navigation";
import bus from "@easy-kit/common/events";
import {UNAUTHORIZED} from "@clover/public/events/auth";
import { useEffect } from "react";

export const useCurrent = () => {
    const account = useRecoilValue(accountInfoState);
    return {
        teamId: account?.currentTeamId,
        projectId: account?.currentProjectId
    }
}

export const useGoLogin = () => {
    const router = useRouter();
    const isLogin = useRecoilValue(isLoginState);
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
        if (!isLogin) {
            goLogin();
        }
    }, [isLogin]);
}
