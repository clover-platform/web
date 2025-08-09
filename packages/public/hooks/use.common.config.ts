import { useAtom } from 'jotai'
import { commonConfigState } from '@clover/public/state/config'

export const useCommonConfig = () => {
  const [config] = useAtom(commonConfigState)
  return config
}
