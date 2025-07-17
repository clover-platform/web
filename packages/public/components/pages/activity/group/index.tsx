import type { ActivityGroup } from '@clover/public/types/activity'
import type { FC } from 'react'
import { ActivityItem } from './item'

export type ActivityGroupProps = {
  data: ActivityGroup
}

export const ActivityGroupItem: FC<ActivityGroupProps> = (props) => {
  const { data } = props
  return (
    <div className="flex flex-col gap-2">
      <div className="text-secondary-foreground/50">{data.formatted}</div>
      <div className="flex flex-col gap-3">
        {data.list.map((item) => (
          <ActivityItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}
