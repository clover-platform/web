import {useAtom} from "jotai";
import {currentEntryState, entriesState} from "@/state/worktop";
import {FC, PropsWithChildren, useMemo} from "react";
import classNames from "classnames";
import { t } from '@easykit/common/utils/locale';

export type ResultCheckProps = PropsWithChildren<{
    className?: string;
}>;

export const EntryCheck: FC<ResultCheckProps> = (props) => {
    const [currentIndex] = useAtom(currentEntryState);
    const [entries] = useAtom(entriesState);
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
    >{t("请选择词条")}</div>;
}
