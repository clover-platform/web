import {useLocale} from "@easykit/common/hooks/use.locale";
import {useMemo} from "react";
import TimeAgo from "javascript-time-ago";

export const useTimeAgo = () => {
    const locale = useLocale();
    return useMemo(() => new TimeAgo(locale), [locale])
}
