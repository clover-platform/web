import { useRecoilValue } from "recoil";
import {currentEntryState, entriesState} from "@/state/worktop";
import { Editor } from "@/components/pages/worktop/main/panel/result/editor";
import { ResultList } from "@/components/pages/worktop/main/panel/result/list";
import {useEffect, useMemo, useState} from "react";
import { ENTRY_RESULT_EDITOR_RESET } from "@/events/worktop";
import bus from "@easy-kit/common/events";
import { Detail } from "@/components/pages/worktop/main/panel/result/detail";
import { Separator } from "@easykit/design";
import {EntryCheck} from "../../check/entry";

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

    return <EntryCheck>
        <div className={"w-full h-full flex justify-center items-center flex-col"}>
            <Detail key={`detail-${current}`}/>
            <Separator/>
            <Editor key={`editor-${editorKey}-${current}`}/>
            <Separator/>
            <ResultList key={`list-${current}`}/>
        </div>
    </EntryCheck>
}
