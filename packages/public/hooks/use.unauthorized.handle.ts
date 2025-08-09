import { useMainApp } from './use.main.app'

import { useCallback, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import bus from '@clover/public/events'
import { UNAUTHORIZED } from '@clover/public/events/auth'
import { isLoginState } from '@clover/public/state/account'

export const useUnauthorizedHandle = () => {
  const isLogin = useAtomValue(isLoginState)
  const mainApp = useMainApp()

  const onUnauthorized = useCallback(() => {
    if (mainApp) {
      location.href = `${mainApp?.href}/login?redirect=${encodeURIComponent(location.href)}`
    }
  }, [mainApp])

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

  return {
    isLogin,
  }
}
