import { useAtom } from 'jotai'
import { baseInfoState } from '@/state/module'

export const useModuleInfo = () => {
  return useAtom(baseInfoState)
}
