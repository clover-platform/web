import { Separator, Skeleton } from '@easykit/design'
import { ActivityListGroupItemLoading } from '../item/loading'

export const ActivityListGroupLoading = () => {
  return (
    <div>
      <div className="relative flex h-8 items-center justify-center">
        <Separator />
        <div className="-mt-3 absolute top-1/2 h-6 overflow-hidden rounded-full border bg-white">
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <ActivityListGroupItemLoading key={item} />
        ))}
      </div>
    </div>
  )
}
