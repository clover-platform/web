import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import {FC, useCallback, useMemo, useState} from "react";
import {Button, Card, Textarea} from "@easykit/design";
import {tt} from "@clover/public/locale";
import {useSse} from "@clover/public/hooks/use.sse";
import MarkdownIt from 'markdown-it';

export type AiWriterViewProps = {

} & NodeViewProps;

const md = new MarkdownIt();

export const AiWriterView: FC<AiWriterViewProps> = (props) => {
    const {editor, getPos, HTMLAttributes = {}, deleteNode} = props;
    const [prompt, setPrompt] = useState<string>("");
    const [result, setResult] = useState<string>("");

    const { send, abort, sending, loading } = useSse({
        url: "/api/wiki/ai/chat",
    })

    const sendPrompt = useCallback(() => {
        setResult("");
        let data = "";
        send({content: prompt}, {
            onMessage: (msg) => {
                const d = JSON.parse(msg).data;
                data += d;
                setResult(data);
            },
            onClose: () => {
            }
        })
    }, [send, prompt, setResult])

    const html = useMemo(() => md.render(result), [result])

    const insert = useCallback(() => {
        editor.chain().insertContent(html).focus().run();
        deleteNode();
    }, [html, editor, getPos, deleteNode])

    const cancel = useCallback(() => {
        deleteNode();
        abort();
    }, [deleteNode, abort])

    return <NodeViewWrapper {...HTMLAttributes}>
        <Card contentClassName={"p-4 space-y-2"}>
            {
                result ? <>
                    <div className={"opacity-50 font-bold text-sm"}>{tt("预览")}</div>
                    <div className={"markdown-body"} dangerouslySetInnerHTML={{__html: html}}></div>
                </> : null
            }
            <div className={"opacity-50 font-bold text-sm"}>{tt("提示词")}</div>
            <div>
                <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className={"bg-secondary"}
                />
            </div>
            <div className={"flex justify-end space-x-2"}>
                <Button onClick={cancel} variant={"destructive"}>{tt("取消")}</Button>
                {
                    loading || sending ? <>
                        <Button onClick={abort}>{tt("停止生成")}</Button>
                    </> : <>
                        { result ? <Button onClick={insert} variant={"secondary"}>{tt("插入")}</Button> : null }
                        <Button onClick={sendPrompt}>{result ? tt("重新生成") : tt("生成文本")}</Button>
                    </>
                }
            </div>
        </Card>
    </NodeViewWrapper>
}
