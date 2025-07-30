import { useMemo } from 'react'
import { useApps } from './use.apps'

export const useMainApp = () => {
  const [apps] = useApps()
  return useMemo(() => {
    return apps.find((app) => app.appId === 'main')
  }, [apps])
}
