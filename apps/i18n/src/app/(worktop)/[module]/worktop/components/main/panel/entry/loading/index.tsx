import { Skeleton } from "@easykit/design";

const LOADING_ITEM = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export const EntryLoading = () => {
  return LOADING_ITEM.map((item) => {
    return (
      <div key={item} className="my-0.5 flex cursor-pointer items-center justify-center rounded-sm px-2 py-1">
        <div className="flex h-6 w-6 items-center justify-center">
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="flex-1">
          <Skeleton className="h-5 w-8/12" />
        </div>
      </div>
    )
  })
}
