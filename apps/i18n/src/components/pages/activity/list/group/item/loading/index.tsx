import { Skeleton } from '@easykit/design'

export const ActivityListGroupItemLoading = () => {
  return (
    <div className="flex items-start justify-center">
      <div className="relative">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="-right-2 absolute bottom-0 flex h-6 w-6 items-center justify-center rounded-full border bg-white">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
      <div className="mx-4 flex min-h-10 flex-1 items-center justify-start">
        <Skeleton className="h-5 w-6/12" />
      </div>
      <div className="flex min-h-10 items-center justify-start text-muted-foreground">
        <Skeleton className="h-5 w-10" />
      </div>
    </div>
  )
}
