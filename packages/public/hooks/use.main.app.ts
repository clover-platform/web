import { useApps } from './use.apps'

import { useMemo } from 'react'

export const useMainApp = () => {
  const [apps] = useApps()
  return useMemo(() => {
    return apps.find((app) => app.appId === 'main')
  }, [apps])
}
