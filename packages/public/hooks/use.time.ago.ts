import { useMemo } from 'react'
import TimeAgo from 'javascript-time-ago'
import { useLocale } from '@clover/public/hooks/use.locale'

export const useTimeAgo = () => {
  const [locale] = useLocale()
  return useMemo(() => new TimeAgo(locale), [locale])
}
