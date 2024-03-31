import { FC } from "react";
import { Member } from "@/types/pages/module";
import { Avatar, Badge } from "@atom-ui/core";

export type MemberItemProps = {} & Member;

const TYPE_MAP: Record<number, string> = {
    2: "{#所有者#}",
    1: "{#管理员#}",
}

export const MemberItem: FC<MemberItemProps> = (props) => {
    return <div className={"flex justify-start items-center"}>
        <Avatar
            className={"w-11 h-11"}
            src={props.avatar}
            fallback={props.username}
            alt={props.username}
            fallbackClassName={"bg-[rgba(0,0,0,0.1)] uppercase font-bold"}
        />
        <div className={"flex-1 mx-3"}>
            <div className={"text-lg text-black leading-none"}>{props.username}</div>
            <div className={"text-muted-foreground"}>{props.email}</div>
        </div>
        <Badge className={"bg-white"} variant="outline">{TYPE_MAP[props.type]}</Badge>
    </div>
}
