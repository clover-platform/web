import { CardButton } from "@clover/public/components/layout/main/guide/card-button";
import { IconCreateTeam, IconJoinTeam } from "@arco-iconbox/react-clover";
import { useAlert } from "@atom-ui/core";
import { FC } from "react";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export type GuideNavProps = {
    onCreate?: () => void;
}

export const GuideNav: FC<GuideNavProps> = (props) => {
    const alert = useAlert();

    const showJoin = () => {
        alert.confirm({
            title: "{#加入团队#}",
            description: "{#请联系团队管理员发送邀请到你的邮箱。#}"
        })
    }

    return <>
        <div className={"text-xl font-bold"}>{"{#你需要加入或者创建团队#}"}</div>
        <div className={"mt-8 flex justify-center items-center w-full max-w-[900px] -m-2"}>
            <CardButton
                onClick={props.onCreate}
                className={"rounded-md flex-1 m-2"}
                icon={<IconCreateTeam {...FIX_ICON_PROPS} fontSize={40} className={"text-primary"} />}
                title={"{#创建团队#}"}
                description={"{#创建一个新的团队#}"}
            />
            <CardButton
                onClick={showJoin}
                className={"rounded-md flex-1 m-2"}
                icon={<IconJoinTeam {...FIX_ICON_PROPS} fontSize={40} className={"text-primary"} />}
                title={"{#加入团队#}"}
                description={"{#加入一个已有的团队#}"}
            />
        </div>
    </>;
}
