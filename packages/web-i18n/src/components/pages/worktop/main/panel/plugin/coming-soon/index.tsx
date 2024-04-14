import {IconComingSoon} from "@arco-iconbox/react-clover";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export const ComingSoon = () => {
    return <div className={"flex justify-center items-center flex-col p-6 space-y-2"}>
        <IconComingSoon {...FIX_ICON_PROPS} className={"text-3xl opacity-60"} />
        <div className={"text-muted-foreground"}>{"{#即将推出#}"}</div>
    </div>
}
