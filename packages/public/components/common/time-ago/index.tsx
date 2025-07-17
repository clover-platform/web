import { useTimeAgo } from '@clover/public/hooks'
import type { FC } from 'react'

export type TimeAgoProps = {
  time: number | string | Date
}

export const TimeAgo: FC<TimeAgoProps> = (props) => {
  const timeAgo = useTimeAgo()
  return timeAgo.format(new Date(props.time))
} 