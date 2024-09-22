import {useRecoilValue} from "recoil";
import {currentEntryState, entriesState} from "@/state/worktop";
import {FC, PropsWithChildren, useMemo} from "react";
import classNames from "classnames";

export type ResultCheckProps = PropsWithChildren<{
    className?: string;
}>;

export const EntryCheck: FC<ResultCheckProps> = (props) => {
    const currentIndex = useRecoilValue(currentEntryState);
    const entries = useRecoilValue(entriesState);
    const current = useMemo(() => {
        if(entries && entries.length) {
            return entries[currentIndex];
        }
        return null;
    }, [currentIndex, entries]);

    return current ? props.children : <div
        className={classNames(
            "w-full h-full flex justify-center items-center text-md text-muted-foreground",
            props.className
        )}
    >{"{#请选择词条#}"}</div>;
}
