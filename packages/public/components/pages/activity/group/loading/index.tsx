import { Skeleton } from '@easykit/design'
import { ActivityGroupItemLoading } from './item'

export const ActivityGroupLoading = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-secondary-foreground/50">
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((item) => (
          <ActivityGroupItemLoading key={item} />
        ))}
      </div>
    </div>
  )
}
