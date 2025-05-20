import { Separator, Skeleton } from "@easykit/design";
import { ActivityListGroupItemLoading } from "@/components/pages/activity/list/group/item/loading";

export const ActivityListGroupLoading = () => {
  return <div>
    <div className={"relative h-8 flex justify-center items-center"}>
      <Separator />
      <div className={"border bg-white absolute top-1/2 -mt-3 h-6 rounded-full overflow-hidden"}>
        <Skeleton className={"w-20 h-6"} />
      </div>
    </div>
    <div className={"space-y-4"}>
      {[1, 2, 3].map((item) => <ActivityListGroupItemLoading key={item} />)}
    </div>
  </div>
}
