import bus from "@easy-kit/common/events";
import {ENTRY_RESULT_RELOAD} from "@/events/worktop";
import {useRecoilState, useRecoilValue} from "recoil";
import {currentEntryState, currentLanguageState, entriesState} from "@/state/worktop";
import {useState} from "react";
import {useMessage} from "@easykit/design";
import {useEntriesUpdater} from "@/components/layout/worktop/hooks";
import {save} from "@/rest/entry.result";

export const useResultSubmit = (): [(content: string) => Promise<any>, boolean] => {
    const entries = useRecoilValue(entriesState);
    const [current, setCurrent] = useRecoilState(currentEntryState);
    const language = useRecoilValue(currentLanguageState);
    const entry = entries[current];
    const [loading, setLoading] = useState(false);
    const msg = useMessage();
    const {update} = useEntriesUpdater();

    const next = () => {
        if(current < entries.length - 1) {
            setCurrent(current + 1)
        }
    }

    const submit = async (content: string) => {
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
            next();
        }else{
            msg.error(message);
        }
    }

    return [submit, loading]
}
