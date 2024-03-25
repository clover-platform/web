import { useRecoilValue } from "recoil";
import { currentEntryState, currentLanguageState, entriesState } from "@/state/worktop";
import { Empty, ScrollArea, Spin } from "@atom-ui/core";
import { useEffect, useState } from "react";
import { list as listRest } from "@/rest/entry.result";
import { ResultItem } from "@/components/pages/module/worktop/main/panel/result/list/item";
import bus from '@easy-kit/common/events';
import { ENTRY_RESULT_RELOAD } from "@/events/worktop";
import { users as usersRest } from "@clover/public/rest/account";
import compact from "lodash/compact";
import uniq from "lodash/uniq";
import { Member } from "@/types/pages/module";
import { EntryResult } from "@/types/pages/entry";

export const ResultList = () => {
    const language = useRecoilValue(currentLanguageState);

    const entries = useRecoilValue(entriesState);
    const current = useRecoilValue(currentEntryState);
    const entry = entries[current];

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [list, setList] = useState<EntryResult[]>([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        const { success, data } = await listRest({
            entryId: entry.id,
            language,
            page: 1,
            size: 5,
        });
        setLoading(false);
        if(success) {
            const { total, data: list } = data;
            const translatorIds = list.map((item) => item.translatorId);
            const verifierIds = list.map((item) => item.checkerId);
            const ids = uniq(compact([...translatorIds, ...verifierIds]));
            const result = await usersRest(ids);
            if(result.success) {
                setList(list.map((item) => {
                    return {
                        ...item,
                        translator: result.data.find((user: Member) => user.id === item.translatorId),
                        verifier: result.data.find((user: Member) => user.id === item.checkerId),
                    }
                }));
            }else{
                setList(list);
            }
            setTotal(total);
        }
    }

    useEffect(() => {
        load().then();
    }, [entry, language]);

    useEffect(() => {
        const handler = () => {
            load().then();
        }
        bus.on(ENTRY_RESULT_RELOAD, handler);
        return () => {
            bus.off(ENTRY_RESULT_RELOAD, handler);
        }
    }, []);

    return <div className={"w-full flex-1 h-0 flex-shrink-0"}>
        <ScrollArea className={"w-full h-full"}>
            {
                loading ? <div className={"flex justify-center items-center p-6"}>
                    <Spin />
                </div> : list.length === 0 ? <Empty text={"{#暂无翻译#}"} /> : <div className={"p-2 space-y-2"}>
                    {
                        list.map((item, index) => {
                            return <ResultItem
                                key={item.id}
                                item={item}
                            />
                        })
                    }
                </div>
            }
        </ScrollArea>
    </div>
}
