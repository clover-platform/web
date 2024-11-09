import { EntryComment } from "@/types/pages/entry";
import { FC } from "react";
import {Avatar, useAlert, useMessage} from "@easykit/design";
import { TimeAgo } from "@easykit/common/components/time-ago";
import {Action} from "@clover/public/components/common/action";
import classNames from "classnames";
import {useProfile} from "@clover/public/hooks/use.profile";
import {deleteComment} from "@/rest/entry.comment";
import bus from "@easykit/common/events";
import {ENTRY_COMMENT_RELOAD} from "@/events/worktop";
import { IconDelete } from "@arco-iconbox/react-clover";
import { t } from '@easykit/common/utils/locale';
import {useParams} from "next/navigation";

export type CommentListItemProps = {
    item: EntryComment;
}

export const CommentListItem: FC<CommentListItemProps> = (props) => {
    const { item } = props;
    const profile = useProfile();
    const msg = useMessage();
    const alert = useAlert();
    const { module } = useParams();

    const del = () => {
        alert.confirm({
            title: t("撤销批准"),
            description: t("是否撤销此翻译的有效结果"),
            onOk: async () => {
                const { success, message } = await deleteComment({
                    module: module as string,
                    entryId: item.entryId,
                    id: item.id,
                })
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
                    <IconDelete />
                </Action>
            </div> : null
        }
    </div>
}
