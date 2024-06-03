import {ai} from "@/rest/entry.result";
import {useCallback, useEffect} from "react";
import {useRecoilValue} from "recoil";
import {currentEntryState, currentLanguageState, entriesState} from "@/state/worktop";

export const AIPlugin = () => {
    const entries = useRecoilValue(entriesState);
    const current = useRecoilValue(currentEntryState);
    const entry = entries[current];
    const language = useRecoilValue(currentLanguageState);

    const load = useCallback(async () => {
        const {success, data, message} = await ai({
            entryId: entry.id,
            language
        });
        console.log(success, data);
    }, [entry, language])

    useEffect(() => {
        load().then();
    }, [entry, language]);

    return <div>
        ai
    </div>
}
