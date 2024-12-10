import {useAtom} from "jotai";
import {collectedState as state} from "@/state/collect";
import {useCallback, useMemo} from "react";
import cloneDeep from "lodash/cloneDeep";
import remove from "lodash/remove";
import bus from "@clover/public/events";
import {UPDATE_COLLECTED} from "@/events/book";

export const useCollected = (id: number): [boolean, (collected: boolean) => void] => {
    const [collectedState, setCollectedState] = useAtom(state);
    const collected = useMemo(() => {
        return collectedState.includes(id);
    }, [collectedState, id])

    const setCollected = useCallback((collected: boolean) => {
        const list = cloneDeep(collectedState);
        if(collected) {
            if(!list.includes(id)) list.push(id);
        }else{
            remove(list, (i) => i === id);
        }
        setCollectedState(list);
        bus.emit(UPDATE_COLLECTED, {
            id,
            collected
        });
    }, [collectedState, setCollectedState, id]);

    return [collected, setCollected];
}
