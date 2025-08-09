import { useAtom } from 'jotai'
import { accessState } from '@clover/public/state/access'

export type AccessChecker = (v: string | string[] | undefined, every?: boolean) => boolean

export const useAccess = (): AccessChecker => {
  const [permissions] = useAtom(accessState)
  return (v: string | string[] | undefined, every = true) => {
    // return true;
    let hasPermissions = false
    if (!v) {
      return true
    }
    if (typeof v === 'string') {
      hasPermissions = permissions?.includes(v)
    } else {
      const arr = v || []
      const executor = every ? 'every' : 'some'
      hasPermissions = arr[executor]((e: string) => permissions?.includes(e))
    }
    return hasPermissions
  }
}
