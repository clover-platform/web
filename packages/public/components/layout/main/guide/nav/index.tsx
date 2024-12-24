import { CardButton } from "@clover/public/components/layout/main/guide/card-button";
import { IconCreateTeam, IconJoinTeam } from "@arco-iconbox/react-clover";
import { useAlert } from "@easykit/design";
import { FC } from "react";
import { t } from '@clover/public/locale';

export type GuideNavProps = {
    onCreate?: () => void;
}

export const GuideNav: FC<GuideNavProps> = (props) => {
    const alert = useAlert();

    const showJoin = () => {
        alert.confirm({
            title: t("加入团队"),
            description: t("请联系团队管理员发送邀请到你的邮箱。")
        })
    }

    return <>
        <div className={"text-xl font-bold mb-md"}>{t("你需要加入或者创建团队")}</div>
        <div className={"mt-8 flex justify-center items-center w-full max-w-[900px] -m-2"}>
            <CardButton
                onClick={props.onCreate}
                className={"rounded-md flex-1 m-2"}
                icon={<IconCreateTeam fontSize={40} className={"text-primary"} />}
                title={t("创建团队")}
                description={t("创建一个新的团队")}
            />
            <CardButton
                onClick={showJoin}
                className={"rounded-md flex-1 m-2"}
                icon={<IconJoinTeam fontSize={40} className={"text-primary"} />}
                title={t("加入团队")}
                description={t("加入一个已有的团队")}
            />
        </div>
    </>;
}
