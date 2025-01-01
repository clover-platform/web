import {IconAIChatFill, IconSend} from "@arco-iconbox/react-clover";
import classNames from "classnames";
import {Input, ScrollArea, Spin, useMessage} from "@easykit/design";
import {Action} from "@clover/public/components/common/action";
import {useAtom} from "jotai";
import {messagesState} from "@/state/chat";
import {useCallback, useEffect, useState} from "react";
import dayjs from "dayjs";
import {Message} from "@/components/layout/book/ai-chat/message";
import {uuid} from "@clover/public/utils";
import {chat} from "@/rest/ai";

export const AiChat = () => {
    const [messages, setMessages] = useAtom(messagesState);
    const [visible, setVisible] = useState(false);
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState("");
    const msg = useMessage();

    useEffect(() => {
        setMessages([
            {
                id: uuid(),
                role: "bot",
                content: "# Hello, I'm wiki, how can I help you?",
                time: dayjs(),
                status: "sent",
            }
        ])
    }, [])

    const sendMessage = useCallback(async () => {
        if(message) {
            const botMsgId = uuid();
            const all = [
                ...messages,
                {
                    id: uuid(),
                    role: "user",
                    content: message,
                    time: dayjs(),
                    status: "sent",
                },
                {
                    id: botMsgId,
                    role: "bot",
                    content: "Thinking...",
                    time: dayjs(),
                    status: "sending",
                }
            ];
            setMessages(all);
            setSending(true);
            setMessage("");
            const { success, message: m, data} = await chat(message);
            setSending(false);
            if(success) {
                // 根据 botMsgId 更新消息
                const message = all.find((item) => item.id === botMsgId);
                if(message) {
                    message.content = data;
                    message.status = "sent";
                }
                console.log(all);
                setMessages([...all]);
            }else{
                msg.error(m);
            }
        }
    }, [messages, message])

    return <>
        <div className={classNames(
            "shadow-lg fixed bottom-[80px] right-md h-[70vh] w-[400px] bg-muted/50 backdrop-blur-sm rounded-lg",
            "justify-center items-center flex-col",
            visible ? "flex" : "hidden"
        )}>
            <div className={"bg-primary text-white px-md py-sm rounded-t-lg font-bold text-lg w-full flex justify-center items-center"}>
                <div className={"flex-1"}>Chat with wiki</div>
                <div className={"w-8 h-8 flex justify-center items-center cursor-pointer"} onClick={() => setVisible(false)}>
                    x
                </div>
            </div>
            <div className={"flex-1 w-full flex-shrink-0 h-0"}>
                <ScrollArea className="h-full w-full">
                    <div className={"px-md py-sm space-y-2"}>
                        { messages.map((item) => <Message key={item.id} {...item}/>)}
                    </div>
                </ScrollArea>
            </div>
            <div className={"w-full px-md py-sm border-t flex justify-center items-center space-x-2"}>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} className={"flex-1"} />
                <Action disabled={sending} onClick={sendMessage}>
                    { sending ? <Spin /> : <IconSend /> }
                </Action>
            </div>
        </div>
        <div
            className={classNames(
                "fixed right-md bottom-md rounded-lg w-12 h-12 bg-primary",
                "flex justify-center items-center cursor-pointer"
            )}
            onClick={() => setVisible(!visible)}
        >
            <IconAIChatFill className={"text-3xl text-white"} />
        </div>
    </>
}
