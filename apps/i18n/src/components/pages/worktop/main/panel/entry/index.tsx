import {Empty, Input, ScrollArea} from "@easykit/design";
import { CreateEntryButton } from "@/components/pages/worktop/main/panel/entry/create/button";
import {FC, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {useAtom} from "jotai";
import {currentEntryState, currentPageState} from "@/state/worktop";
import { CheckIcon, } from "@radix-ui/react-icons";
import {Pagination} from "@/components/pages/worktop/main/panel/entry/pagination";
import { EntryLoading } from "@/components/pages/worktop/main/panel/entry/loading";
import {LanguageCheck} from "@/components/pages/worktop/main/check/language";
import { t } from '@easykit/common/utils/locale';
import {useEntriesLoader} from "@/components/layout/worktop/hooks";
import bus from "@easykit/common/events";
import {ENTRY_RELOAD} from "@/events/worktop";

export type EntryPanelProps = {}

export const SIZE = 50;

export const EntryPanel: FC<EntryPanelProps> = (props) => {
    const [page, setPage] = useAtom(currentPageState);
    const [current, setCurrent] = useAtom(currentEntryState);
    const [keyword, setKeyword] = useState<string>('');
    const {entries: _entries, loading, load} = useEntriesLoader();

    useEffect(() => {
        const handler = () => {
            setCurrent(0);
            load().then();
        }
        bus.on(ENTRY_RELOAD, handler);
        return () => {
            bus.off(ENTRY_RELOAD, handler);
        }
    }, [])

    const pages = useMemo(() => {
        return Math.ceil((_entries?.length || 0) / SIZE);
    }, [_entries]);

    const entries = useMemo(() => {
        return _entries?.slice((page - 1) * SIZE, page * SIZE) || [];
    }, [_entries, page]);

    const search = (e: any) => {
        if (e.keyCode === 13) {
            setPage(1);
            setCurrent(0);
            load({page: 1, keyword}).then();
        }
    }

    const changePage = (page: number) => {
        setPage(page);
        setCurrent(0);
    }

    const iconCheck = <CheckIcon className={"text-sm text-green-500"}/>;
    const iconNormal = <div className={"w-2.5 h-2.5 rounded-[2px] bg-red-300"}/>;
    const iconTranslated = <div className={"w-2.5 h-2.5 rounded-[2px] bg-primary opacity-90"}/>;

    return <LanguageCheck>
        <div className={"w-full h-full bg-muted flex justify-center items-center flex-col"}>
            <div className={"p-2 flex justify-center items-center space-x-2 w-full"}>
                <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className={"flex-1"}
                    placeholder={t("搜索词条")}
                    onKeyUp={search}
                />
                <CreateEntryButton/>
            </div>
            <div className={"w-full flex-1 h-0 flex-shrink-0 relative"}>
                <ScrollArea className={"h-full w-full p-2 pt-0"}>
                    {
                        loading ? <EntryLoading/> : entries.length ? entries.map((entry, index) => {
                            const {verified, translated} = entry;
                            return <div
                                key={entry.id}
                                className={classNames(
                                    "flex justify-center items-center px-2 py-1 rounded-sm my-0.5 cursor-pointer",
                                    "hover:bg-white/70",
                                    current === index ? "bg-white" : "bg-transparent text-muted-foreground",
                                )}
                                onClick={() => setCurrent(index)}
                            >
                                <div className={"w-6 h-6 flex justify-center items-center"}>
                                    <div className={"w-5 h-5 rounded-full bg-white flex justify-center items-center"}>
                                        {translated ? (verified ? iconCheck : iconTranslated) : iconNormal}
                                    </div>
                                </div>
                                <div className={"flex-1 w-0 flex-shrink-0 truncate"}>
                                    {entry.value}
                                </div>
                            </div>
                        }) : <Empty text={t("暂无词条")}/>
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
