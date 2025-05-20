import { Empty, Input, ScrollArea } from "@easykit/design";
import { CreateEntryButton } from "@/components/pages/worktop/main/panel/entry/create/button";
import { useEffect } from "react";
import classNames from "classnames";
import { CheckIcon, } from "@radix-ui/react-icons";
import { Pagination } from "@/components/pages/worktop/main/panel/entry/pagination";
import { EntryLoading } from "@/components/pages/worktop/main/panel/entry/loading";
import { LanguageCheck } from "@/components/pages/worktop/main/check/language";
import { useEntriesLoader } from "@/components/layout/worktop/hooks";
import bus from "@clover/public/events";
import { ENTRY_RELOAD } from "@/events/worktop";
import { useTranslation } from "react-i18next";

export const SIZE = 50;

export const EntryPanel = () => {
  const {
    entries, loading, load,
    setKeyword, setCurrent, setPage,
    keyword, pages, page, current
  } = useEntriesLoader();
  const { t } = useTranslation();

  useEffect(() => {
    const handler = () => {
      setCurrent(0);
      setPage(1);
      load().then();
    }
    bus.on(ENTRY_RELOAD, handler);
    return () => {
      bus.off(ENTRY_RELOAD, handler);
    }
  }, [])

  const changePage = (page: number) => {
    setPage(page);
    setCurrent(0);
  }

  const iconCheck = <CheckIcon className={"text-sm text-green-500"} />;
  const iconNormal = <div className={"w-2.5 h-2.5 rounded-[2px] bg-red-300"} />;
  const iconTranslated = <div className={"w-2.5 h-2.5 rounded-[2px] bg-primary opacity-90"} />;

  return <LanguageCheck>
    <div className={"w-full h-full bg-muted flex justify-center items-center flex-col"}>
      <div className={"p-2 flex justify-center items-center space-x-2 w-full"}>
        <Input
          value={keyword}
          onChange={(e) => {
            setPage(1);
            setCurrent(0);
            setKeyword(e.target.value);
          }}
          className={"flex-1"}
          placeholder={t("搜索词条")}
        />
        <CreateEntryButton />
      </div>
      <div className={"w-full flex-1 h-0 flex-shrink-0 relative"}>
        <ScrollArea className={"h-full w-full p-2 pt-0"}>
          {
            loading ? <EntryLoading /> : entries.length ? entries.map((entry, index) => {
              const { verified, translated } = entry;
              return <div
                key={entry.id}
                className={classNames(
                  "flex justify-center items-center px-2 py-1 rounded-sm m-1 cursor-pointer",
                  "action-effect action-effect-active",
                  current === index ? "action-active" : "bg-transparent text-muted-foreground",
                )}
                onClick={() => setCurrent(index)}
              >
                <div className={"w-6 h-6 flex justify-center items-center"}>
                  <div className={"w-5 h-5 rounded-full bg-white dark:bg-black/30 flex justify-center items-center"}>
                    {translated ? (verified ? iconCheck : iconTranslated) : iconNormal}
                  </div>
                </div>
                <div className={"flex-1 w-0 flex-shrink-0 truncate text-foreground text-sm pl-1"}>
                  {entry.value}
                </div>
              </div>
            }) : <Empty text={t("暂无词条")} />
          }
        </ScrollArea>
        <div className={"absolute bottom-2 right-2"}>
          <Pagination
            page={page}
            pages={pages}
            onChange={changePage}
          />
        </div>
      </div>
    </div>
  </LanguageCheck>
}
