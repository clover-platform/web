import { useAtom } from 'jotai'
import { appsState } from '@clover/public/state/apps'

export const useApps = () => {
  return useAtom(appsState)
}
