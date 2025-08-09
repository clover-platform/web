import type { FC } from 'react'
import { Avatar, Badge } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import type { Member } from '@/types/module/member'

export type MemberItemProps = {} & Member

export const MemberItem: FC<MemberItemProps> = (props) => {
  const { t } = useTranslation()
  const TYPE_MAP: Record<number, string> = {
    2: t('所有者'),
    1: t('管理员'),
  }

  const { user, roles } = props
  return (
    <div className="flex items-center justify-start">
      <Avatar
        alt={user.username}
        className="h-11 w-11"
        fallback={user.username}
        fallbackClassName="bg-[rgba(0,0,0,0.1)] uppercase font-bold"
        src={user.avatar}
      />
      <div className="mx-3 flex-1">
        <div className="text-lg leading-none">{user.username}</div>
        <div className="text-muted-foreground">{user.email}</div>
      </div>
      {roles.map((role) => (
        <Badge className="mr-2" key={role}>
          {TYPE_MAP[role]}
        </Badge>
      ))}
    </div>
  )
}
