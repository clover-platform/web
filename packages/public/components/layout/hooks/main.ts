import { useCallback, useEffect } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import bus from '@clover/public/events'
import { UNAUTHORIZED } from '@clover/public/events/auth'
import { accountInfoState, isLoginState } from '@clover/public/state/account'
import { teamsState } from '@clover/public/state/public'

export const useCurrent = () => {
  const [account] = useAtom(accountInfoState)
  return {
    teamId: account?.currentTeamId,
  }
}

export const useCurrentTeam = () => {
  const [account] = useAtom(accountInfoState)
  const teams = useAtomValue(teamsState)
  return teams.find((team) => team.id === account?.currentTeamId)
}

export const useGoLogin = () => {
  const router = useRouter()
  const [isLogin] = useAtom(isLoginState)
  const goLogin = useCallback(() => {
    router.push(`/login?from=${encodeURIComponent(location.href)}`)
  }, [router])

  useEffect(() => {
    bus.on(UNAUTHORIZED, goLogin)
    return () => {
      bus.off(UNAUTHORIZED, goLogin)
    }
  }, [goLogin])

  useEffect(() => {
    if (!isLogin) {
      goLogin()
    }
  }, [goLogin, isLogin])
}
