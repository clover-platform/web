import type { ActivityGroup } from '@/types/module/activity'
import { Empty } from '@easykit/design'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityListGroup } from './group'
import { ActivityListGroupLoading } from './group/loading'
export type ActivityListProps = {
  items: ActivityGroup[]
  loading: boolean
}

export const ActivityList: FC<ActivityListProps> = (props) => {
  const { loading, items } = props
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      {!loading && items.length === 0 ? <Empty text={t('暂无动态')} /> : null}
      {items.map((item) => (
        <ActivityListGroup key={item.time} title={item.time} items={item.list} />
      ))}
      {loading && [1, 2].map((item) => <ActivityListGroupLoading key={item} />)}
    </div>
  )
}
