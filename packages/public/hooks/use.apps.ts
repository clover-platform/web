import { appsState } from '@clover/public/state/apps'
import { useAtom } from 'jotai'

export const useApps = () => {
  return useAtom(appsState)
}