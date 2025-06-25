import { Skeleton } from "@easykit/design";
import classNames from 'classnames'

export const ResultItemLoading = () => {
  return (
    <div className={classNames('rounded-md border')}>
      <div className="flex items-start justify-center rounded-t-md bg-muted px-3 py-2">
        <div className="mr-2 flex-1 py-1">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-black/10" />
            <Skeleton className="h-4 w-6/12 bg-black/10" />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
      <div className="space-y-2 p-2">
        <div className="flex items-center justify-start space-x-2">
          <div className="flex items-center justify-start">
            <Skeleton className="h-8 w-8 rounded-full" />
            <span className="ml-1 text-muted-foreground">
              <Skeleton className="h-4 w-10" />
            </span>
          </div>
          <div className="text-muted-foreground">
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </div>
    </div>
  )
}
