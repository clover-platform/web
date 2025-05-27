import { Skeleton } from "@easykit/design";

export const CommentListItemLoading = () => {
  return (
    <div className="mx-3 flex items-start justify-center">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="ml-1 flex-1">
        <div className="rounded-md bg-muted p-2">
          <div className="text-muted-foreground text-xs">
            <Skeleton className="h-3 w-10" />
          </div>
          <div className="mt-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-6/12" />
          </div>
        </div>
        <div className="mt-1 pl-1 text-muted-foreground text-xs">
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </div>
  )
}
