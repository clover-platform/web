import {User} from "@clover/public/types/account";
import {FC, useMemo} from "react";
import classNames from "classnames";
import {HoverCard, HoverCardContent, HoverCardTrigger, HoverCardArrow} from "@easykit/design";
import { useTranslation } from "react-i18next";
export type UserItemProps = {
  info: User;
  className?: string;
}

type AvatarProps = {
  avatar: string;
  fallback: string;
  className?: string;
}

const Avatar: FC<AvatarProps> = (props) => {
  const {avatar, fallback, className} = props;
  return <div
    className={classNames(
      "w-8 h-8 rounded-full bg-secondary flex justify-center items-center overflow-hidden",
      "text-secondary-foreground font-medium cursor-default",
      className
    )}
  >
    {avatar ? <img src={avatar} alt={"avatar"}/> : fallback}
  </div>
}

export const UserItem: FC<UserItemProps> = (props) => {
  const {className, info} = props;
  const firstLetter = info.username[0].toUpperCase();
  const { t } = useTranslation();

  const avatar = useMemo(() => {
    return <Avatar className={className} avatar={info.avatar} fallback={firstLetter}/>
  }, [info, className, firstLetter])

  return <HoverCard>
    <HoverCardTrigger>{avatar}</HoverCardTrigger>
    <HoverCardContent side={"top"} className={"border-none p-0"}>
      <HoverCardArrow className={"fill-white"}/>
      <div className={"bg-primary p-4 rounded-t-md flex space-x-4 text-white justify-center items-center"}>
        <Avatar avatar={info.avatar} fallback={firstLetter}/>
        <div className={"flex-1 text-lg font-medium"}>{info.username}</div>
      </div>
      <div className={"p-3 flex flex-wrap space-x-3"}>
        <div className={"space-x-2"}><span className={"text-secondary-foreground/50"}>{t("粉丝")}</span><span>0</span>
        </div>
        <div className={"space-x-2"}><span className={"text-secondary-foreground/50"}>{t("关注")}</span><span>0</span>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
}
