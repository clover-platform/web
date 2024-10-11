import {ai} from "@/rest/entry.result";
import {useCallback, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {currentEntryState, currentLanguageState, entriesState} from "@/state/worktop";
import {ScrollArea} from "@easykit/design";
import {AIItem} from "@/components/pages/worktop/main/panel/plugin/ai/item";
import {AIItemLoading} from "@/components/pages/worktop/main/panel/plugin/ai/item/loading";

const AIIListLoading = () => {
    return [0,1,2].map((index) => <AIItemLoading key={index} />);
}

export const AIPlugin = () => {
    const entries = useRecoilValue(entriesState);
    const current = useRecoilValue(currentEntryState);
    const entry = entries[current];
    const language = useRecoilValue(currentLanguageState);
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<string[]>([]);

    const load = useCallback(async () => {
        setLoading(true);
        const {success, data, message} = await ai({
            entryId: entry.id,
            language
        });
        setLoading(false);
        if(success) {
            setResults(data || []);
        }else{
            setResults([]);
        }
    }, [entry, language]);

    useEffect(() => {
        setResults([]);
        load().then();
    }, [entry.id, language]);

    return <div className={"w-full h-full"}>
        <ScrollArea className={"h-full w-full"}>
            <div className={"px-3 space-y-2 pb-3"}>
                { loading ? <AIIListLoading /> : null }
                { results.map((item) => <AIItem key={item} value={item} />) }
            </div>
        </ScrollArea>
    </div>
}
