import { FC } from "react";
import JTimeAgo from "javascript-time-ago";
import { t } from '@easykit/common/utils/locale';

export type TimeAgoProps = {
    time: number | string | Date;
}

export const TimeAgo: FC<TimeAgoProps> = (props) => {
    const timeAgo = new JTimeAgo(t("LANG"))
    return timeAgo.format(new Date(props.time))
}
