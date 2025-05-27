import { Skeleton } from "@easykit/design";

export const AIItemLoading = () => {
  return (
    <div className="flex items-center justify-center space-x-1 rounded-lg bg-muted p-3">
      <div className="flex-1">
        <Skeleton className="h-4 w-8/12" />
      </div>
      <div className="flex h-7 w-7 items-center justify-center">
        <Skeleton className="h-5 w-5 rounded-sm" />
      </div>
    </div>
  )
}
