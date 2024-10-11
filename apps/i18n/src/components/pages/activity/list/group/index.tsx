import {Activity} from "@/types/pages/activity";
import {FC} from "react";
import {Separator} from "@easykit/design";
import {ActivityListGroupItem} from "@/components/pages/activity/list/group/item";

export type ActivityListGroupProps = {
    items: Activity[];
    title: string;
}

export const ActivityListGroup: FC<ActivityListGroupProps> = (props) => {
    const { title, items } = props;
    return <div>
        <div className={"relative h-8 flex justify-center items-center"}>
            <Separator />
            <div className={"border bg-white absolute top-1/2 -mt-3 h-6 px-2 rounded-full"}>{title}</div>
        </div>
        <div className={"space-y-4"}>
            { items.map((item) => <ActivityListGroupItem item={item} key={item.id} />)}
        </div>
    </div>
}
