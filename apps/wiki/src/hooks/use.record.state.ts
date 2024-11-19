import {ExtractAtomValue, useAtom} from "jotai";
import {useCallback, useMemo} from "react";
import cloneDeep from "lodash/cloneDeep";

export type UseRecordStateResult<T> = [T, (data: T) => void];

export function useRecordState<T> (state: ExtractAtomValue<Record<string, T>>, key: string): UseRecordStateResult<T> {
    const [recordState, setRecordState] = useAtom<Record<string, T>>(state);

    const data = useMemo(() => {
        return (recordState[key] || []) as T;
    }, [recordState, key])

    const setData = useCallback((newData: T) => {
        const record = cloneDeep(recordState);
        record[key] = newData;
        setRecordState(record);
    }, [recordState, setRecordState, key])

    return [data, setData]
}
