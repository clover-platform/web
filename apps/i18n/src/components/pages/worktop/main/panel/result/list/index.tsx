import { useAtom } from "jotai";
import { currentEntryState, currentLanguageState, entriesState } from "@/state/worktop";
import { Button, Empty, ScrollArea } from "@easykit/design";
import { useEffect, useRef, useState, useCallback } from "react";
import { list as listRest } from "@/rest/entry.result";
import { ResultItem } from "@/components/pages/worktop/main/panel/result/list/item";
import bus from '@clover/public/events';
import { ENTRY_RESULT_RELOAD } from "@/events/worktop";
import { compact, uniq } from "es-toolkit";
import { EntryResult } from "@/types/pages/entry";
import { ResultListLoading } from "@/components/pages/worktop/main/panel/result/list/loading";
import { useParams } from "next/navigation";
import { useCurrentBranch } from "@/hooks/use.current.branch";
import { useTranslation } from "react-i18next";

export const ResultList = () => {
  const [language] = useAtom(currentLanguageState);
  const [entries] = useAtom(entriesState);
  const [current] = useAtom(currentEntryState);
  const entry = entries[current];
  const { t } = useTranslation();

  const pageRef = useRef(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<EntryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { module } = useParams();
  const branch = useCurrentBranch();

  const load = useCallback(async (options?: {append?: boolean}) => {
    const { append= false } = options || {};
    if(!append) setList([]);
    setLoading(true);
    const { success, data } = await listRest({
      module: module as string,
      entryId: entry?.id,
      language,
      page: pageRef.current,
      size: 5,
      branch: branch?.name || ''
    });
    if(success) {
      const { total, data: newList } = data!;
      const translatorIds = newList.map((item) => item.translatorId);
      const verifierIds = newList.map((item) => item.checkerId);
      const ids = uniq(compact([...translatorIds, ...verifierIds]));
      console.log(ids);
      setList([
        ...(append ? list : []),
        ...newList
      ]);
      setTotal(total);
    }
    setLoading(false);
  }, [entry, language, module, branch, list]);

  const loadMore = () => {
    pageRef.current += 1;
    load({append: true}).then();
  }

  useEffect(() => {
    pageRef.current = 1;
    load().then();
  }, [entry, language, load]);

  useEffect(() => {
    const handler = () => {
      pageRef.current = 1;
      load().then();
    }
    bus.on(ENTRY_RESULT_RELOAD, handler);
    return () => {
      bus.off(ENTRY_RESULT_RELOAD, handler);
    }
  }, [load]);

  return <div className={"w-full flex-1 h-0 flex-shrink-0"}>
    <ScrollArea className={"w-full h-full"}>
      { !loading && list.length === 0 ? <Empty text={t("暂无翻译")} /> : null  }
      <div className={"p-2 space-y-2"}>
        {
          list.map((item) => {
            return <ResultItem
              key={item.id}
              item={item}
            />
          })
        }
        { loading ? <ResultListLoading /> : null }
        {
          !loading && total > list.length ? <div className={"w-full flex justify-center"}>
            <Button onClick={loadMore} variant="link">{t("加载更多")}</Button>
          </div> : null
        }
      </div>
    </ScrollArea>
  </div>
}
