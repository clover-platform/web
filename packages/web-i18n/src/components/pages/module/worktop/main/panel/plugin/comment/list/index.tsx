import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentEntryState, currentLanguageState, entriesState } from "@/state/worktop";
import { list as listRest } from "@/rest/entry.comment";
import { ENTRY_COMMENT_RELOAD } from "@/events/worktop";
import bus from '@easy-kit/common/events';
import { CommentListItem } from "@/components/pages/module/worktop/main/panel/plugin/comment/list/item";
import { EntryComment } from "@/types/pages/entry";
import { Empty, ScrollArea } from "@atom-ui/core";
import { CommentListItemLoading } from "@/components/pages/module/worktop/main/panel/plugin/comment/list/item/loading";

const CommentListLoading = () => {
    return [0,1,2].map((index) => <CommentListItemLoading key={index} />);
}

export const CommentList = () => {
    const [loading, setLoading] = useState(false);
    const entries = useRecoilValue(entriesState);
    const current = useRecoilValue(currentEntryState);
    const entry = entries[current];
    const language = useRecoilValue(currentLanguageState);
    const [list, setList] = useState<EntryComment[]>([]);
    const [total, setTotal] = useState(0);

    const load = async () => {
        setList([]);
        setLoading(true);
        const { success, data } = await listRest({
            entryId: entry.id,
            language,
            page: 1,
            size: 10,
        });
        setLoading(false);
        success && setList(data?.data || []);
        success && setTotal(data?.total || 0);
    }

    useEffect(() => {
        load().then();
    }, [current, language]);

    useEffect(() => {
        load().then();
        const handler = () => {
            load().then();
        }
        bus.on(ENTRY_COMMENT_RELOAD, handler);
        return () => {
            bus.off(ENTRY_COMMENT_RELOAD, handler);
        }
    }, [])

    return <div className={"flex-1 w-full h-0 flex-shrink-0"}>
        <ScrollArea className={"h-full w-full "}>
            <div className={"space-y-3 pb-2"}>
                { loading ? <CommentListLoading/> : null }
                { list.map((item) => <CommentListItem key={item.id} item={item} />) }
                { !loading && list.length === 0 ? <Empty text={"{#暂无评论#}"}/> : null }
            </div>
        </ScrollArea>
    </div>
}
