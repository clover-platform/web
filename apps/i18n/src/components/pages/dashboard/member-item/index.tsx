import type { Member } from '@/types/pages/module'
import { Avatar, Badge } from "@easykit/design";
import type { FC } from 'react'
import { useTranslation } from "react-i18next";

export type MemberItemProps = {} & Member;

export const MemberItem: FC<MemberItemProps> = (props) => {
  const { t } = useTranslation();
  const TYPE_MAP: Record<number, string> = {
    2: t("所有者"),
    1: t("管理员"),
  }

  const { user, roles } = props;
  return (
    <div className="flex items-center justify-start">
      <Avatar
        className="h-11 w-11"
        src={user.avatar}
        fallback={user.username}
        alt={user.username}
        fallbackClassName="bg-[rgba(0,0,0,0.1)] uppercase font-bold"
      />
      <div className="mx-3 flex-1">
        <div className="text-lg leading-none">{user.username}</div>
        <div className="text-muted-foreground">{user.email}</div>
      </div>
      {roles.map((role) => (
        <Badge key={role} className="mr-2">
          {TYPE_MAP[role]}
        </Badge>
      ))}
    </div>
  )
}
