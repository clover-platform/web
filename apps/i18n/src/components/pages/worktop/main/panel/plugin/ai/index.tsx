import { ai } from "@/rest/entry.result";
import { useCallback, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { currentEntryState, currentLanguageState, entriesState } from "@/state/worktop";
import { ScrollArea } from "@easykit/design";
import { AIItem } from "@/components/pages/worktop/main/panel/plugin/ai/item";
import { AIItemLoading } from "@/components/pages/worktop/main/panel/plugin/ai/item/loading";
import { useParams } from "next/navigation";
import { useCurrentBranch } from "@/hooks/use.current.branch";

const AIIListLoading = () => {
  return [0, 1, 2].map((index) => <AIItemLoading key={index} />);
}

export const AIPlugin = () => {
  const [entries] = useAtom(entriesState);
  const [current] = useAtom(currentEntryState);
  const entry = entries[current];
  const [language] = useAtom(currentLanguageState);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<string[]>([]);
  const { module } = useParams();
  const branch = useCurrentBranch();

  const load = useCallback(async () => {
    setLoading(true);
    const { success, data } = await ai({
      module: module as string,
      entryId: entry.id,
      language,
      branch: branch?.name || ''
    });
    setLoading(false);
    if (success) {
      setResults(data || []);
    } else {
      setResults([]);
    }
  }, [branch?.name, entry.id, language, module]);

  useEffect(() => {
    setResults([]);
    load().then();
  }, [entry.id, language, load]);

  return <div className={"w-full h-full"}>
    <ScrollArea className={"h-full w-full"}>
      <div className={"px-3 space-y-2 pb-3"}>
        {loading ? <AIIListLoading /> : null}
        {results.map((item) => <AIItem key={item} value={item} />)}
      </div>
    </ScrollArea>
  </div>
}
