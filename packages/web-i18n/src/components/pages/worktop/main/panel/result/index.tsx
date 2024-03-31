import { useRecoilValue } from "recoil";
import { currentEntryState } from "@/state/worktop";
import { Editor } from "@/components/pages/worktop/main/panel/result/editor";
import { ResultList } from "@/components/pages/worktop/main/panel/result/list";
import { useEffect, useState } from "react";
import { ENTRY_RESULT_EDITOR_RESET } from "@/events/worktop";
import bus from "@easy-kit/common/events";
import { Detail } from "@/components/pages/worktop/main/panel/result/detail";
import { Separator } from "@atom-ui/core";

export const ResultPanel = () => {
    const [editorKey, setEditorKey] = useState(Date.now());

    useEffect(() => {
        const handler = () => {
            setEditorKey(Date.now());
        }
        bus.on(ENTRY_RESULT_EDITOR_RESET, handler)
        return () => {
            bus.off(ENTRY_RESULT_EDITOR_RESET, handler)
        }
    }, []);

    const current = useRecoilValue(currentEntryState);
    return <div className={"w-full h-full flex justify-center items-center flex-col"}>
        <Detail key={`detail-${current}`}/>
        <Separator />
        <Editor key={`editor-${editorKey}-${current}`} />
        <Separator />
        <ResultList key={`list-${current}`} />
    </div>
}
