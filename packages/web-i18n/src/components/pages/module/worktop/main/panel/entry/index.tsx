import {Empty, Input, ScrollArea, Spin} from "@atom-ui/core";
import { CreateEntryButton } from "@/components/pages/module/worktop/main/panel/entry/create/button";
import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import {useRecoilState} from "recoil";
import {currentEntryState} from "@/state/worktop";
import { CheckIcon, } from "@radix-ui/react-icons";
import bus from '@easy-kit/common/events';
import {ENTRY_RELOAD} from "@/events/worktop";
import {Pagination} from "@/components/pages/module/worktop/main/panel/entry/pagination";

export type EntryPanelProps = {
    pages: number;
    total: number;
    entries: any[];
    loading: boolean;
    load: (params: any) => Promise<any>;
}

export const EntryPanel: FC<EntryPanelProps> = (props) => {
    const {pages, entries, loading, load} = props;
    const [page, setPage] = useState<number>(1);
    const [current, setCurrent] = useRecoilState(currentEntryState);
    const [keyword, setKeyword] = useState<string>('');

    useEffect(() => {
        load({page}).then();
        bus.on(ENTRY_RELOAD, load);
        return () => {
            bus.off(ENTRY_RELOAD, load);
        }
    }, [])

    const search = (e: any) => {
        if (e.keyCode === 13) {
            setPage(1);
            load({page: 1, keyword}).then();
        }
    }

    const changePage = (page: number) => {
        setPage(page);
        setCurrent(0);
        load({page}).then();
    }

    const iconCheck = <CheckIcon className={"text-sm text-green-500"}/>;
    const iconNormal = <div className={"w-2.5 h-2.5 rounded-[2px] bg-red-300"}/>;
    const iconTranslated = <div className={"w-2.5 h-2.5 rounded-[2px] bg-primary opacity-90"}/>;

    return <div className={"w-full h-full bg-muted flex justify-center items-center flex-col"}>
        <div className={"p-2 flex justify-center items-center space-x-2 w-full"}>
            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={"flex-1"}
                placeholder={"{#搜索词条#}"}
                onKeyUp={search}
            />
            <CreateEntryButton/>
        </div>
        <div className={"w-full flex-1 h-0 flex-shrink-0 relative"}>
            <ScrollArea className={"h-full w-full p-2 pt-0"}>
                {
                    loading ? <div className={"flex justify-center items-center p-6"}>
                        <Spin/>
                    </div> : entries.length ? entries.map((entry, index) => {
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
                                    { translated ? (verified ? iconCheck : iconTranslated) : iconNormal }
                                </div>
                            </div>
                            <div className={"flex-1 w-0 flex-shrink-0 truncate"}>
                                {entry.value}
                            </div>
                        </div>
                    }) : <Empty text={"{#暂无词条#}"} />
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
}
