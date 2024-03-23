import {Input, ScrollArea, Spin} from "@atom-ui/core";
import { CreateEntryButton } from "@/components/pages/module/worktop/main/panel/entry/create/button";
import {useEffect} from "react";
import {useEntriesLoader} from "@/components/layout/worktop/hooks";
import classNames from "classnames";
import {useRecoilState} from "recoil";
import {currentEntryState} from "@/state/worktop";
import {CheckIcon} from "@radix-ui/react-icons";
import bus from '@easy-kit/common/events';
import {ENTRY_RELOAD} from "@/events/worktop";

export const EntryPanel = () => {
    const {entries, loading, load} = useEntriesLoader();
    const [current, setCurrent] = useRecoilState(currentEntryState);

    useEffect(() => {
        load().then();
        bus.on(ENTRY_RELOAD, load);
        return () => {
            bus.off(ENTRY_RELOAD, load);
        }
    }, [])

    const iconCheck = <CheckIcon className={"text-sm text-green-500"}/>;
    const iconNormal = <div className={"w-2.5 h-2.5 rounded-[2px] bg-red-300"}/>;
    const iconTranslated = <div className={"w-2.5 h-2.5 rounded-[2px] bg-primary opacity-90"}/>;

    return <div className={"w-full h-full bg-muted flex justify-center items-center flex-col"}>
        <div className={"p-2 flex justify-center items-center space-x-2 w-full"}>
            <Input className={"flex-1"} placeholder={"{#搜索词条#}"}/>
            <CreateEntryButton/>
        </div>
        <div className={"w-full flex-1 h-0 flex-shrink-0"}>
            <ScrollArea className={"h-full w-full p-2 pt-0"}>
                {
                    loading ? <div className={"flex justify-center items-center p-6"}>
                        <Spin/>
                    </div> : entries.map((entry, index) => {
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
                    })
                }
            </ScrollArea>
        </div>
    </div>
}
