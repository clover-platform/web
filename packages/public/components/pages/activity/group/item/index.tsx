import { getActionTitle } from './config'

import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { UserItem } from '@clover/public/components/common/user-item'
import { ICONS } from '@clover/public/config/icons'
import { useTimeAgo } from '@clover/public/hooks'
import type { Activity } from '@clover/public/types/activity'

export type ActivityItemProps = {
  data: Activity
}

export const ActivityItem: FC<ActivityItemProps> = (props) => {
  const { data } = props
  const { app, url, title, account } = data
  const timeAgo = useTimeAgo()
  const { t } = useTranslation()

  const href = useMemo(() => {
    if (url) {
      const cleanBaseUrl = app.baseUrl.replace(/\/$/, '')
      const cleanUrl = url.replace(/^\//, '')
      return [cleanBaseUrl, cleanUrl].join('/')
    }
    return undefined
  }, [app.baseUrl, url])

  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center gap-2 pt-1">
        <UserItem info={account} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span>{account.username}</span>
          <span>{t(getActionTitle(data.action))}</span>
          <span className="text-secondary-foreground/50">{timeAgo.format(new Date(data.createTime))}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-sm text-white">
            {ICONS[app.label]}
          </div>
          {href ? (
            <a className="underline hover:text-primary" href={href} rel="noopener noreferrer" target="_blank">
              {title}
            </a>
          ) : (
            title
          )}
        </div>
      </div>
    </div>
  )
}
