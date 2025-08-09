import { useApps } from './use.apps'

import { useCallback } from 'react'
import { useAtom } from 'jotai'
import { apps as appsRest } from '@clover/public/rest/config'
import { loadingState } from '@clover/public/state/apps'
import type { AppsItem } from '@clover/public/types/config'

export const useAppsLoader = (): {
  loading: boolean
  apps: AppsItem[]
  load: () => Promise<void>
} => {
  const [loading, setLoading] = useAtom(loadingState)
  const [apps, setApps] = useApps()

  const load = useCallback(async () => {
    const { success, data } = await appsRest()
    setLoading(false)
    setApps(success ? data! : [])
  }, [setApps, setLoading])

  return { loading, apps, load }
}
