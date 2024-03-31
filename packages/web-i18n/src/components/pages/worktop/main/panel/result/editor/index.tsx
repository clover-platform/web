import { useRecoilState, useRecoilValue } from "recoil";
import { currentEntryState, currentLanguageState, entriesState } from "@/state/worktop";
import { Action } from "@clover/public/components/common/action";
import { CopyIcon } from "@radix-ui/react-icons";
import {
    Button,
    Tooltip,
    useMessage,
} from "@atom-ui/core";
import { IconClear } from "@arco-iconbox/react-clover";
import { useState } from "react";
import { save } from "@/rest/entry.result";
import TextareaAutosize from 'react-textarea-autosize';
import bus from '@easy-kit/common/events';
import { ENTRY_RESULT_RELOAD } from "@/events/worktop";
import { useEntriesUpdater } from "@/components/layout/worktop/hooks";

export const Editor = () => {
    const entries = useRecoilValue(entriesState);
    const [current, setCurrent] = useRecoilState(currentEntryState);
    const language = useRecoilValue(currentLanguageState);
    const entry = entries[current];
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(entry?.translation?.content);
    const msg = useMessage();
    const { update } = useEntriesUpdater();

    const next = () => {
        if(current < entries.length - 1) {
            setCurrent(current + 1)
        }
    }

    const onSave = async () => {
        if(!content) {
            return msg.error("{#请输入翻译结果#}")
        }
        setLoading(true);
        const { success, message } = await save({
            moduleId: entry.moduleId,
            entryId: entry.id,
            content,
            language,
        });
        setLoading(false);
        if(success) {
            bus.emit(ENTRY_RESULT_RELOAD);
            await update(entry.id);
            // next();
        }else{
            msg.error(message);
        }
    }

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
