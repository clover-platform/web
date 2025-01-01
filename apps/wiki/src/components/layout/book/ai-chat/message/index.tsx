import {Message as MessageData} from "@/types/chat";
import {FC} from "react";
import Markdown from "react-markdown";
import {IconAI} from "@arco-iconbox/react-clover";
import {time} from "@easykit/design";

export type MessageProps = MessageData;

export const Message: FC<MessageProps> = (props) => {
    const { content, time: timeData } = props;
    return <div className={"flex justify-center items-start space-x-2 mr-2xl"}>
        <div className={"w-10 h-10 rounded-full bg-secondary flex justify-center items-center"}>
            <IconAI className={"text-lg text-secondary-foreground"} />
        </div>
        <div className={"flex-1 space-y-1 flex flex-col items-start"}>
            <div className={"bg-primary p-sm rounded-sm"}><Markdown>{content}</Markdown></div>
            <div className={"opacity-50 px-sm text-sm"}>{time(timeData)}</div>
        </div>
    </div>
}
