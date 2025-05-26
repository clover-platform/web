import bus from '@clover/public/events'
import { UNAUTHORIZED } from '@clover/public/events/auth'
import { isLoginState } from '@clover/public/state/account'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect } from 'react'

export const useUnauthorizedHandle = () => {
  const isLogin = useAtomValue(isLoginState)

  const onUnauthorized = useCallback(() => {
    location.href = `/login?redirect=${encodeURIComponent(location.href)}`
  }, [])

  useEffect(() => {
    if (!isLogin) {
      onUnauthorized()
    }
  }, [isLogin, onUnauthorized])

  useEffect(() => {
    bus.on(UNAUTHORIZED, onUnauthorized)
    return () => {
      bus.off(UNAUTHORIZED, onUnauthorized)
    }
  }, [onUnauthorized])
}
