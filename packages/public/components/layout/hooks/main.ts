import bus from '@clover/public/events'
import { UNAUTHORIZED } from '@clover/public/events/auth'
import { accountInfoState, isLoginState } from '@clover/public/state/account'
import { projectsState, teamsState } from '@clover/public/state/public'
import { useAtom, useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

export const useCurrent = () => {
  const [account] = useAtom(accountInfoState)
  return {
    teamId: account?.currentTeamId,
    projectId: account?.currentProjectId,
  }
}

export const useCurrentTeam = () => {
  const [account] = useAtom(accountInfoState)
  const teams = useAtomValue(teamsState)
  return teams.find((team) => team.id === account?.currentTeamId)
}

export const useCurrentProject = () => {
  const [account] = useAtom(accountInfoState)
  const projects = useAtomValue(projectsState)
  return projects.find((project) => project.id === account?.currentProjectId)
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
