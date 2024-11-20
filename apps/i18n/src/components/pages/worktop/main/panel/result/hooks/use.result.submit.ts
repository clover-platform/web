import bus from "@easykit/common/events";
import {ENTRY_RESULT_RELOAD} from "@/events/worktop";
import {useAtom} from "jotai";
import {currentEntryState, currentLanguageState, entriesState} from "@/state/worktop";
import {useState} from "react";
import {useMessage} from "@easykit/design";
import {useEntriesUpdater} from "@/components/layout/worktop/hooks";
import {save} from "@/rest/entry.result";
import { t } from '@easykit/common/utils/locale';
import {useParams} from "next/navigation";

export const useResultSubmit = (): [(content: string) => Promise<any>, boolean] => {
    const [entries] = useAtom(entriesState);
    const [current, setCurrent] = useAtom(currentEntryState);
    const [language] = useAtom(currentLanguageState);
    const entry = entries[current];
    const [loading, setLoading] = useState(false);
    const msg = useMessage();
    const {update} = useEntriesUpdater();
    const { module } = useParams();

    const next = () => {
        if(current < entries.length - 1) {
            setCurrent(current + 1)
        }
    }

    const submit = async (content: string) => {
        if(!content) {
            return msg.error(t("请输入翻译结果"))
        }
        setLoading(true);
        const { success, message } = await save({
            module: module as string,
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
