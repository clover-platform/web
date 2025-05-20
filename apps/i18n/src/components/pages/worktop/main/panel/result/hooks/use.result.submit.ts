import bus from "@clover/public/events";
import { ENTRY_RESULT_RELOAD } from "@/events/worktop";
import { useAtom } from "jotai";
import { currentEntryState, currentLanguageState, entriesState } from "@/state/worktop";
import { useState } from "react";
import { useMessage } from "@easykit/design";
import { useEntriesUpdater } from "@/components/layout/worktop/hooks";
import { save } from "@/rest/entry.result";
import { useParams } from "next/navigation";
import { useCurrentBranch } from "@/hooks/use.current.branch";
import { useTranslation } from "react-i18next";
export const useResultSubmit = (): [(content: string) => Promise<any>, boolean] => {
  const [entries] = useAtom(entriesState);
  const [current, setCurrent] = useAtom(currentEntryState);
  const [language] = useAtom(currentLanguageState);
  const entry = entries[current];
  const [loading, setLoading] = useState(false);
  const msg = useMessage();
  const { update } = useEntriesUpdater();
  const { module } = useParams();
  const branch = useCurrentBranch();
  const { t } = useTranslation();

  const next = () => {
    if (current < entries.length - 1) {
      setCurrent(current + 1)
    }
  }

  const submit = async (content: string) => {
    if (!content) {
      return msg.error(t("请输入翻译结果"))
    }
    setLoading(true);
    const { success, message } = await save({
      module: module as string,
      entryId: entry.id,
      content,
      language,
      branch: branch?.name || ''
    });
    setLoading(false);
    if (success) {
      bus.emit(ENTRY_RESULT_RELOAD);
      await update(entry.id);
      next();
    } else {
      msg.error(message);
    }
  }

  return [submit, loading]
}
