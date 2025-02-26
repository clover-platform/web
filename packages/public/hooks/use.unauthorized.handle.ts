import {useAtomValue} from "jotai";
import {isLoginState} from "@clover/public/state/account";
import {useCallback, useEffect} from "react";
import bus from "@clover/public/events";
import {UNAUTHORIZED} from "@clover/public/events/auth";

export const useUnauthorizedHandle = () => {
  const isLogin = useAtomValue(isLoginState);

  const onUnauthorized = useCallback(() => {
    location.href = `/login?redirect=${encodeURIComponent(location.href)}`;
  }, [])

  useEffect(() => {
    if(!isLogin) {
      onUnauthorized();
    }
  }, [isLogin, onUnauthorized]);

  useEffect(() => {
    bus.on(UNAUTHORIZED, onUnauthorized);
    return () => {
      bus.off(UNAUTHORIZED, onUnauthorized);
    }
  }, [onUnauthorized])
}
