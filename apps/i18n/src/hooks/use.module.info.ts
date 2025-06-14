import { baseInfoState } from '@/state/module'
import { useAtom } from 'jotai'

export const useModuleInfo = () => {
  return useAtom(baseInfoState)
}