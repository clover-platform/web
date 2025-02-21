import {useAtom} from "jotai";
import {accountInfoState, isLoginState} from "@clover/public/state/account";
import {useRouter} from "next/navigation";
import bus from "@clover/public/events";
import {UNAUTHORIZED} from "@clover/public/events/auth";
import {useEffect} from "react";

export const useCurrent = () => {
  const [account] = useAtom(accountInfoState);
  return {
    teamId: account?.currentTeamId,
    projectId: account?.currentProjectId
  }
}

export const useGoLogin = () => {
  const router = useRouter();
  const [isLogin] = useAtom(isLoginState);
  const goLogin = () => {
    router.push(`/login?from=${encodeURIComponent(location.href)}`)
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
