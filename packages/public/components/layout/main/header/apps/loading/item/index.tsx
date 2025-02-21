import {Skeleton} from "@easykit/design"

export const AppsLoadingItem = () => {
  return <div className={"flex items-center space-x-2 p-2"}>
    <Skeleton className="h-10 w-10"/>
    <div className="space-y-1 flex-1">
      <Skeleton className="h-5 w-8/12"/>
      <Skeleton className="h-3 w-12/12"/>
    </div>
  </div>
}
