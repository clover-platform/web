import { FC } from "react";
import { Member } from "@/types/pages/module";
import { Avatar, Badge } from "@easykit/design";

export type MemberItemProps = {} & Member;

const TYPE_MAP: Record<number, string> = {
    2: t("所有者"),
    1: t("管理员"),
}

export const MemberItem: FC<MemberItemProps> = (props) => {
    const { user, roles } = props;
    return <div className={"flex justify-start items-center"}>
        <Avatar
            className={"w-11 h-11"}
            src={user.avatar}
            fallback={user.username}
            alt={user.username}
            fallbackClassName={"bg-[rgba(0,0,0,0.1)] uppercase font-bold"}
        />
        <div className={"flex-1 mx-3"}>
            <div className={"text-lg text-black leading-none"}>{user.username}</div>
            <div className={"text-muted-foreground"}>{user.email}</div>
        </div>
        { roles.map((role) => <Badge key={role} className={"mr-2"}>{TYPE_MAP[role]}</Badge>) }
    </div>
}
