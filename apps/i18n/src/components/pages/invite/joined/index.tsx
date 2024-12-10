import {CheckCircledIcon} from "@radix-ui/react-icons";
import {Button} from "@easykit/design";
import {FC} from "react";
import {useRouter} from "next/navigation";
import { t } from '@clover/public/locale';

export type InvitePageJoinedProps = {
    module: string;
}

export const InvitePageJoined: FC<InvitePageJoinedProps> = (props) => {
    const router = useRouter();
    const { module } = props;

    const detail = () => {
        router.push(`/i18n/${module}/dashboard`);
    }

    return <div className={"flex justify-center items-center flex-col"}>
        <div className={"my-6"}>
            <CheckCircledIcon className={"w-12 h-12 text-primary"} />
        </div>
        <div>
            <span className={"text-muted-foreground"}>{t("你已经加入该项目")}</span>
            <Button onClick={detail} className={"p-1"} variant={"link"}>{t("查看详情")}</Button>
        </div>
    </div>
}
