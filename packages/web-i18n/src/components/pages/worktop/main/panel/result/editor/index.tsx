import { useRecoilState, useRecoilValue } from "recoil";
import { currentEntryState, entriesState } from "@/state/worktop";
import { Action } from "@clover/public/components/common/action";
import { CopyIcon } from "@radix-ui/react-icons";
import {
    Button,
    Tooltip,
} from "@atom-ui/core";
import { IconClear } from "@arco-iconbox/react-clover";
import {useCallback, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {useResultSubmit} from "@/components/pages/worktop/main/panel/result/hooks/use.result.submit";

export const Editor = () => {
    const entries = useRecoilValue(entriesState);
    const [current, setCurrent] = useRecoilState(currentEntryState);
    const entry = entries[current];
    const [content, setContent] = useState(entry?.translation?.content);
    const [submit, loading] = useResultSubmit();

    const onSave = useCallback(async () => {
        await submit(content!);
    }, [content])

    return <div className={"w-full"}>
        <TextareaAutosize
            minRows={3}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={"{#请输入翻译内容#}"}
            className={"border-none rounded-none shadow-none focus-visible:ring-0 px-4 py-2 w-full focus:outline-none resize-none"}
        />
        <div className={"flex justify-center items-center p-2 px-4"}>
            <div className={"flex-1 flex justify-start items-center"}>
                <Tooltip content={"{#使用源语言填充#}"}>
                    <Action onClick={() => setContent(entry?.value)}>
                        <CopyIcon />
                    </Action>
                </Tooltip>
                <Tooltip content={"{#清空#}"}>
                    <Action onClick={() => setContent('')}>
                        <IconClear className={"text-base"} />
                    </Action>
                </Tooltip>
            </div>
            <div>
                <Button
                    loading={loading}
                    variant={"outline"}
                    onClick={onSave}
                >
                    {"{#保存#}"}
                </Button>
            </div>
        </div>
    </div>
}
