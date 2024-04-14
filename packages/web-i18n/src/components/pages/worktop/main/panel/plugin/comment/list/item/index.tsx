import { EntryComment } from "@/types/pages/entry";
import { FC } from "react";
import {Avatar, useAlert, useMessage} from "@atom-ui/core";
import { TimeAgo } from "@easy-kit/common/components/time-ago";
import {Action} from "@clover/public/components/common/action";
import classNames from "classnames";
import {useProfile} from "@clover/public/hooks/account";
import {deleteComment} from "@/rest/entry.comment";
import bus from "@easy-kit/common/events";
import {ENTRY_COMMENT_RELOAD} from "@/events/worktop";
import { IconDelete } from "@arco-iconbox/react-clover";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export type CommentListItemProps = {
    item: EntryComment;
}

export const CommentListItem: FC<CommentListItemProps> = (props) => {
    const { item } = props;
    const profile = useProfile();
    const msg = useMessage();
    const alert = useAlert();

    const del = () => {
        alert.confirm({
            title: "{#撤销批准#}",
            description: "{#是否撤销此翻译的有效结果#}",
            onOk: async () => {
                const { success, message } = await deleteComment(item.id)
                if(success) {
                    bus.emit(ENTRY_COMMENT_RELOAD);
                }else{
                    msg.error(message);
                }
                return success;
            }
        })
    }

    return <div className={"mx-3 flex justify-center items-start relative group"}>
        <Avatar
            className={"w-10 h-10"}
            src={item.user?.avatar!}
            fallback={item.user?.username!}
        />
        <div className={"ml-1 flex-1"}>
            <div className={"bg-muted rounded-md p-2"}>
                <div className={"text-muted-foreground text-xs"}>{item.user?.username!}</div>
                <div className={"mt-1"}>{item.content}</div>
            </div>
            <div className={"mt-1 text-muted-foreground pl-1 text-xs"}>
                <TimeAgo time={item.createTime} />
            </div>
        </div>
        {
            profile.id === item.createUserId ? <div className={classNames(
                "absolute top-1 right-1 bg-white p-1 rounded-sm flex justify-center items-center space-x-1",
                "hidden group-hover:flex",
            )}>
                <Action onClick={del} className={"!p-1"}>
                    <IconDelete {...FIX_ICON_PROPS} />
                </Action>
            </div> : null
        }
    </div>
}
