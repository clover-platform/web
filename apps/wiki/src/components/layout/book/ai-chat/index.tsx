import {IconAIChatFill, IconSend} from "@arco-iconbox/react-clover";
import classNames from "classnames";
import {Input, ScrollArea, Spin} from "@easykit/design";
import {Action} from "@clover/public/components/common/action";
import {useAtom} from "jotai";
import {messagesState} from "@/state/chat";
import {useCallback, useEffect, useState} from "react";
import dayjs from "dayjs";
import {Message} from "@/components/layout/book/ai-chat/message";
import {uuid} from "@clover/public/utils";
import {Message as MessageData} from "@/types/chat";
import {Cross1Icon} from "@radix-ui/react-icons";
import {tt} from "@clover/public/locale";
import "./style.scss";
import {useSse} from "@clover/public/hooks/use.sse";

export const AiChat = () => {
    const [messages, setMessages] = useAtom(messagesState);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessages([
            {
                id: uuid(),
                role: "bot",
                content: tt("你好，我是知识库文档助手，需要帮助吗？"),
                time: dayjs(),
            },
        ])
    }, [])

    const sendMessage = useCallback(async () => {
        if(message) {
            const all: MessageData[] = [
                ...messages,
                {
                    id: uuid(),
                    role: "user",
                    content: message,
                    time: dayjs(),
                },
                {
                    id: uuid(),
                    role: "bot",
                    content: "Thinking...",
                    time: dayjs(),
                    request: message
                }
            ];
            setMessages(all);
            setMessage("");
        }
    }, [messages, message])

    return <>
        <div className={classNames(
            "shadow-lg fixed bottom-[80px] right-md h-[calc(100vh-80px-16px)] z-50 w-[400px] bg-white dark:bg-muted/50 backdrop-blur-sm rounded-lg",
            "justify-center items-center flex-col",
            visible ? "flex" : "hidden"
        )}>
            <div className={"bg-primary text-white px-md py-sm rounded-t-lg font-bold text-lg w-full flex justify-center items-center"}>
                <div className={"flex-1"}>Chat with wiki</div>
                <div className={"w-8 h-8 flex justify-center items-center cursor-pointer"} onClick={() => setVisible(false)}>
                    <Cross1Icon />
                </div>
            </div>
            <div className={"flex-1 w-full flex-shrink-0 h-0"}>
                <ScrollArea className="h-full w-full">
                    <div className={"px-md py-sm space-y-2 break-all"}>
                        { messages.map((item) => <Message key={item.id} {...item} />) }
                    </div>
                </ScrollArea>
            </div>
            <div className={"w-full px-md py-sm border-t flex justify-center items-center space-x-2"}>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} className={"flex-1"} />
                <Action onClick={sendMessage}>
                    <IconSend />
                </Action>
            </div>
        </div>
        <div
            className={classNames(
                "fixed right-md bottom-md rounded-lg w-12 h-12 bg-primary",
                "flex justify-center items-center cursor-pointer shadow-md"
            )}
            onClick={() => setVisible(!visible)}
        >
            <IconAIChatFill className={"text-3xl text-white"} />
        </div>
    </>
}
