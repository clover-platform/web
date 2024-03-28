import { EntryComment } from "@/types/pages/entry";
import { FC } from "react";
import { Avatar } from "@atom-ui/core";
import { TimeAgo } from "@easy-kit/common/components/time-ago";

export type CommentListItemProps = {
    item: EntryComment;
}

export const CommentListItem: FC<CommentListItemProps> = (props) => {
    const { item } = props;
    return <div className={"mx-3 flex justify-center items-start"}>
        <Avatar
            className={"w-10 h-10"}
            src={item.createUser?.avatar!}
            fallback={item.createUser?.username!}
        />
        <div className={"ml-1 flex-1"}>
            <div className={"bg-muted rounded-md p-2"}>
                <div className={"text-muted-foreground text-xs"}>Username</div>
                <div className={"mt-1"}>{item.content}</div>
            </div>
            <div className={"mt-1 text-muted-foreground pl-1 text-xs"}>
                <TimeAgo time={item.createTime} />
            </div>
        </div>
    </div>
}
