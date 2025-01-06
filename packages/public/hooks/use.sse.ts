import {useCallback, useState} from "react";
import {getToken} from "@clover/public/utils/token";

export type SseProps = {
    url: string;
}

export type SendCallback = (data: any, onMessage: (data: string) => void) => void;

async function fetchSSE(url: string, options: any) {
    const { headers = {}, body, method = 'POST' } = options;

    const response = await fetch(url, {
        method,
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 处理 SSE 流
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
                console.log(line.replace('data:', ''));
            }
        }
    }
}

export const useSse = (props: SseProps): [SendCallback, boolean] => {
    const [loading, setLoading] = useState(false);

    const send = useCallback<SendCallback>(async (params: any, onMessage: (data: string) => void) => {
        const token = await getToken();
        await fetchSSE(`${process.env.NEXT_PUBLIC_API_URL || ""}${props.url}`, {
            headers: {
                Authorization: `Bearer ${token?.token}`,
            },
            body: params,
        });
    }, []);

    return [send, loading];
}
