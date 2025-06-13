import bus from '@clover/public/events'
import { UNAUTHORIZED } from '@clover/public/events/auth'
import { isLoginState } from '@clover/public/state/account'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo } from 'react'
import { useApps } from './use.apps'

export const useUnauthorizedHandle = () => {
  const isLogin = useAtomValue(isLoginState)
  const [apps] = useApps()

  const homeApp = useMemo(() => {
    return apps.find((app) => app.appId === 'home')
  }, [apps])

  const onUnauthorized = useCallback(() => {
    location.href = `${homeApp?.href}/login?redirect=${encodeURIComponent(location.href)}`
  }, [homeApp])

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
