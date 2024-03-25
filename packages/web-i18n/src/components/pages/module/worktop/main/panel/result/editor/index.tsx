import { useRecoilState, useRecoilValue } from "recoil";
import { branchesState, currentEntryState, currentLanguageState, entriesState } from "@/state/worktop";
import { Action } from "@clover/public/components/common/action";
import { ArrowLeftIcon, ArrowRightIcon, CopyIcon, DotsHorizontalIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Badge, Button, Separator, Textarea, Tooltip, useMessage } from "@atom-ui/core";
import { IconClear } from "@arco-iconbox/react-clover";
import { useState } from "react";
import { save } from "@/rest/entry.result";
import TextareaAutosize from 'react-textarea-autosize';
import bus from '@easy-kit/common/events';
import { ENTRY_RESULT_RELOAD } from "@/events/worktop";

export const Editor = () => {
    const entries = useRecoilValue(entriesState);
    const [current, setCurrent] = useRecoilState(currentEntryState);
    const branches = useRecoilValue(branchesState);
    const language = useRecoilValue(currentLanguageState);
    const entry = entries[current];
    const branch = branches.find(b => b.id === entry.branchId);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const msg = useMessage();

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
        }else{
            msg.error(message);
        }
    }

    return <div className={"w-full"}>
        <div className={"flex justify-center items-center p-2 px-4"}>
            <div className={"flex-1 text-base text-muted-foreground"}>{"{#原始内容#}"}</div>
            <div className={"flex"}>
                <Tooltip content={"{#上一个#}"}>
                    <Action disabled={current === 0} onClick={() => setCurrent(current - 1)}>
                        <ArrowLeftIcon />
                    </Action>
                </Tooltip>
                <Tooltip content={"{#下一个#}"}>
                    <Action disabled={current === entries.length - 1} onClick={() => setCurrent(current + 1)}>
                        <ArrowRightIcon />
                    </Action>
                </Tooltip>
                <Tooltip content={"{#编辑#}"}>
                    <Action>
                        <Pencil1Icon />
                    </Action>
                </Tooltip>
                <Action>
                    <DotsHorizontalIcon />
                </Action>
            </div>
        </div>
        <div className={"px-4 mb-4"}>
            { entry.value }
        </div>
        <div className={"px-4 mb-4"}>
            <Badge className={"mr-2"}>{branch?.name}</Badge>
            <span className={"text-muted-foreground"}>{ entry.key }</span>
        </div>
        <Separator />
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
                    <Action onClick={() => setContent(entry.value)}>
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
        <Separator />
    </div>
}
