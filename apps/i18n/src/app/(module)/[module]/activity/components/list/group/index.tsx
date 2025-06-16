import type { Activity } from '@/types/module/activity'
import { Separator } from '@easykit/design'
import type { FC } from 'react'
import { ActivityListGroupItem } from './item'

export type ActivityListGroupProps = {
  items: Activity[]
  title: string
}

export const ActivityListGroup: FC<ActivityListGroupProps> = (props) => {
  const { title, items } = props
  return (
    <div>
      <div className="relative flex h-8 items-center justify-center">
        <Separator />
        <div className="-mt-3 absolute top-1/2 h-6 rounded-full border bg-white px-2">{title}</div>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <ActivityListGroupItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}
