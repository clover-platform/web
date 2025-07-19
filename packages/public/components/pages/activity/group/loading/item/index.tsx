import { Skeleton } from '@easykit/design'

export const ActivityGroupItemLoading = () => {
  return (
    <div className="flex w-full items-start gap-3">
      <div className="flex items-center gap-2 pt-1">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex items-center gap-1">
          <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-sm text-white">
            <Skeleton className="h-5 w-5 rounded-sm" />
          </div>
          <Skeleton className="h-5 w-6/12" />
        </div>
      </div>
    </div>
  )
}
