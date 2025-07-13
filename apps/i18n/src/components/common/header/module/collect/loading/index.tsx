import { Skeleton } from '@easykit/design'

export const CollectLoadingItem = () => {
  return (
    <div className="group flex cursor-pointer items-center justify-center space-x-2 rounded-md p-2 hover:bg-secondary">
      <Skeleton className="h-8 w-8 rounded-md" />
      <div className="flex flex-1 items-center justify-start">
        <span>
          <Skeleton className="h-6 w-24" />
        </span>
        <span className="ml-1 opacity-60">
          <Skeleton className="h-6 w-12" />
        </span>
      </div>
    </div>
  )
}
