import { useLocale } from '@clover/public/hooks/use.locale'
import TimeAgo from "javascript-time-ago";
import { useMemo } from 'react'

export const useTimeAgo = () => {
  const [locale] = useLocale()
  return useMemo(() => new TimeAgo(locale), [locale])
}
