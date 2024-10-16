import {LinkBreak2Icon} from "@radix-ui/react-icons";
import { t } from '@easykit/common/utils/locale';

export const InvitePageExpired = () => {
    return <div className={"flex justify-center items-center flex-col"}>
        <div className={"my-6 opacity-60"}>
            <LinkBreak2Icon className={"w-12 h-12"} />
        </div>
        <div className={"text-muted-foreground"}>{t("邀请链接已过期")}</div>
    </div>
}
