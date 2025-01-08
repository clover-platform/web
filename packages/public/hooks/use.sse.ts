import {useCallback, useRef, useState} from "react";
import {getToken} from "@clover/public/utils/token";

export type SseProps = {
    url: string;
}

export type SendEvent = {
    onMessage?: (data: string) => void;
    onError?: (error: Error) => void;
    onClose?: () => void;
}
export type SendCallback = (data: any, events?: SendEvent) => void;

export type SseResult = {
    send: SendCallback;
    abort: () => void;
    sending: boolean;
    loading: boolean;
}

export type ChatParams = {
    content: string;
    type: "chat" | "writer";
    data?: string;
}

export const useSse = (props: SseProps): SseResult => {
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const controllerRef = useRef<AbortController>(null);

    const send = useCallback<SendCallback>(async (params: ChatParams, events) => {
        const {onClose, onMessage, onError} = events || {};
        const token = await getToken();

        setSending(true);
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}${props.url}`, {
            method: "POST",
            headers: {
                 Authorization: `Bearer ${token?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
            signal,
        });
        setSending(false);

        if (!response.ok) {
            onError?.(new Error(`HTTP error! status: ${response.status}`));
            return;
        }

        // 处理 SSE 流
        setLoading(true);
        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');

        let buffer = '';

        while (true) {
            const { done, value } = await reader?.read()!;
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // 处理 SSE 数据块
            let lines = buffer.split('\n');
            buffer = lines.pop()!; // 保留未完成的数据块

            for (const line of lines) {
                if (line.startsWith('data:')) {
                    onMessage?.(line.replace('data:', ''));
                }
            }
        }
        setLoading(false);
        onClose?.();
    }, [controllerRef]);

    const abort = useCallback(() => {
        controllerRef.current?.abort();
        setLoading(false);
        setSending(false);
    }, [controllerRef]);

    return {send, abort, sending, loading};
}
