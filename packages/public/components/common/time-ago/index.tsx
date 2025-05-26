import i18next from 'i18next'
import JTimeAgo from "javascript-time-ago";
import type { FC } from 'react'

export type TimeAgoProps = {
  time: number | string | Date;
}

export const TimeAgo: FC<TimeAgoProps> = (props) => {
  const timeAgo = new JTimeAgo(i18next.language)
  return timeAgo.format(new Date(props.time)) 
}
