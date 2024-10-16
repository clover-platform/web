import {useCallback, useEffect, useRef, useState} from "react";
import { useRecoilValue } from "recoil";
import { currentEntryState, currentLanguageState, entriesState } from "@/state/worktop";
import { list as listRest } from "@/rest/entry.comment";
import { ENTRY_COMMENT_RELOAD } from "@/events/worktop";
import bus from '@easykit/common/events';
import { CommentListItem } from "@/components/pages/worktop/main/panel/plugin/comment/list/item";
import { EntryComment } from "@/types/pages/entry";
import {Button, Empty, ScrollArea} from "@easykit/design";
import { CommentListItemLoading } from "@/components/pages/worktop/main/panel/plugin/comment/list/item/loading";
import {handler} from "tailwindcss-animate";

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
    const pageRef = useRef(1);

    const load = useCallback(async (options?: {append?: boolean}) => {
        const { append= false } = options || {};
        if(!append) setList([]);
        setLoading(true);
        const { success, data } = await listRest({
            entryId: entry.id,
            language,
            page: pageRef.current,
            size: 50,
        });
        setLoading(false);
        success && setList([
            ...(append ? list : []),
            ...data?.data || []
        ]);
        success && setTotal(data?.total || 0);
    }, [language, entry, list])

    useEffect(() => {
        pageRef.current = 1;
        load().then();
    }, [entry.id, language]);

    useEffect(() => {
        const handler = () => {
            pageRef.current = 1;
            load().then();
        }
        bus.on(ENTRY_COMMENT_RELOAD, handler);
        return () => {
            bus.off(ENTRY_COMMENT_RELOAD, handler);
        }
    }, [load])

    const loadMore = useCallback(async () => {
        pageRef.current += 1;
        load({append: true}).then();
    }, [load]);

    return <div className={"flex-1 w-full h-0 flex-shrink-0"}>
        <ScrollArea className={"h-full w-full "}>
            <div className={"space-y-3 pb-2"}>
                { list.map((item) => <CommentListItem key={item.id} item={item} />) }
                { loading ? <CommentListLoading/> : null }
                { !loading && list.length === 0 ? <Empty text={t("暂无评论")}/> : null }
                {
                    !loading && total > list.length ? <div className={"w-full flex justify-center"}>
                        <Button onClick={loadMore} variant="link">{t("加载更多")}</Button>
                    </div> : null
                }
            </div>
        </ScrollArea>
    </div>
}
