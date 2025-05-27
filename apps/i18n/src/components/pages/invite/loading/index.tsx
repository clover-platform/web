import { Skeleton } from "@easykit/design";

export const InvitePageLoading = () => {
  return (
    <div className="mt-8 w-[360px] space-y-4">
      <div className="text-base">
        <Skeleton className="h-6 w-6/12" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="flex items-start justify-center rounded-md border p-3 shadow">
          <div className="mr-2">
            <Skeleton className="h-10 w-12" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-base">
              <Skeleton className="h-6 w-6/12" />
            </div>
            <div className="text-muted-foreground">
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="space-y-1 rounded-md bg-muted p-2">
              <div className="flex items-center justify-center">
                <div className="mr-2">
                  <Skeleton className="h-6 w-8" />
                </div>
                <div className="flex-1 text-md text-muted-foreground">
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <div className="-mx-2 h-0.5 bg-white" />
              <div className="flex items-center justify-center">
                <div className="mr-2">
                  <Skeleton className="h-6 w-8" />
                </div>
                <div className="flex-1 text-md text-muted-foreground">
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="!mt-8">
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}
