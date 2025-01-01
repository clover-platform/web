import {Message as MessageData} from "@/types/chat";
import {FC} from "react";
import Markdown from "react-markdown";
import {IconAI, IconUser} from "@arco-iconbox/react-clover";
import {Spin, time, Tooltip} from "@easykit/design";
import classNames from "classnames";

export type MessageProps = MessageData;

export const Message: FC<MessageProps> = (props) => {
    const { content, time: timeData, role, status } = props;
    return <div className={classNames(
        "flex justify-center items-start",
        role === "user" ? "flex-row-reverse ml-2xl" : "flex-row mr-2xl"
    )}>
        <div className={classNames(
            "w-10 h-10 rounded-full flex justify-center items-center",
            role === "user" ? "ml-xs bg-primary" : "mr-xs bg-secondary"
        )}>
            { role === "bot" ? <IconAI className={"text-lg text-secondary-foreground"} /> : null }
            { role === "user" ? <IconUser className={"text-lg text-white"} /> : null }
        </div>
        <div className={classNames(
            "flex-1 space-y-1 flex flex-col",
            role === "user" ? "items-end" : "items-start"
        )}>
            <div className={classNames(
                "py-xs leading-6",
                role === "user" ? "ml-xs bg-secondary px-sm rounded-sm text-foreground" : ""
            )}>
                { status === "sending" ? <div className={"h-6 leading-6 flex items-center"}><Spin /></div> : <div className={"markdown-body"}><Markdown>{content}</Markdown></div> }
            </div>
            <div className={"opacity-50 text-sm"}>{time(timeData)}</div>
        </div>
    </div>
}
