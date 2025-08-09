import { useAtom } from 'jotai'
import { accountInfoState } from '@clover/public/state/account'

export const useProfile = () => {
  const [profile] = useAtom(accountInfoState)
  return profile
}
