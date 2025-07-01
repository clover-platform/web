import { commonConfigState } from '@clover/public/state/config'
import { useAtom } from 'jotai'

export const useCommonConfig = () => {
  const [config] = useAtom(commonConfigState)
  return config
}