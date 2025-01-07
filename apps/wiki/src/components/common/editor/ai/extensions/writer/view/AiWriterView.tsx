import { Editor, NodeViewWrapper } from '@tiptap/react'
import {FC} from "react";
import {Button, Card, Textarea} from "@easykit/design";
import {tt} from "@clover/public/locale";

interface AiWriterViewProps {
    editor: Editor
    getPos: () => number
    HTMLAttributes: Record<string, any>
}

export const AiWriterView: FC<AiWriterViewProps> = (props) => {
    const {editor, getPos, HTMLAttributes = {}} = props;

    return <NodeViewWrapper {...HTMLAttributes}>
        <Card contentClassName={"p-4 space-y-2"}>
            <div>{tt("提示词")}</div>
            <div>
                <Textarea className={"bg-secondary"} />
            </div>
            <div className={"flex justify-end"}>
                <Button>{tt("生成文本")}</Button>
            </div>
        </Card>
    </NodeViewWrapper>
}
