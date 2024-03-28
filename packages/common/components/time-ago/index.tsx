import { FC } from "react";
import JTimeAgo from "javascript-time-ago";

export type TimeAgoProps = {
    time: number | string | Date;
}

export const TimeAgo: FC<TimeAgoProps> = (props) => {
    const timeAgo = new JTimeAgo('{#LANG#}')
    return timeAgo.format(new Date(props.time))
}
