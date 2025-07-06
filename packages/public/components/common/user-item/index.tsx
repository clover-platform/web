import type { User } from '@clover/public/types/account'
import { Avatar, HoverCard, HoverCardContent, HoverCardTrigger } from '@easykit/design'
import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
export type UserItemProps = {
  info: User
  className?: string
}

export const UserItem: FC<UserItemProps> = (props) => {
  const { className, info } = props
  const firstLetter = info.username[0].toUpperCase()
  const { t } = useTranslation()

  const avatar = useMemo(() => {
    return <Avatar className={className} src={info.avatar} fallback={firstLetter} />
  }, [info, className, firstLetter])

  return (
    <HoverCard>
      <HoverCardTrigger>{avatar}</HoverCardTrigger>
      <HoverCardContent side="top" className="border-none p-0">
        <div className="flex items-center justify-center space-x-4 rounded-t-md bg-primary p-4 text-white">
          <Avatar src={info.avatar} fallback={firstLetter} fallbackClassName="text-secondary-foreground" />
          <div className="flex-1 font-medium text-lg">{info.username}</div>
        </div>
        <div className="flex flex-wrap space-x-3 p-3">
          <div className="space-x-2">
            <span className="text-secondary-foreground/50">{t('粉丝')}</span>
            <span>0</span>
          </div>
          <div className="space-x-2">
            <span className="text-secondary-foreground/50">{t('关注')}</span>
            <span>0</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
