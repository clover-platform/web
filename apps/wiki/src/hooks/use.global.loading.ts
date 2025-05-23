import {PrimitiveAtom, useAtom} from "jotai";
import {useCallback, useMemo} from "react";
import { cloneDeep, remove } from "es-toolkit";

export type GlobalLoadingResult = [boolean, (loading: boolean) => void];

export function useGlobalLoading<T> (state: PrimitiveAtom<T[]>, id: T): GlobalLoadingResult {
  const [loadingState, setLoadingState] = useAtom<T[]>(state);

  const loading = useMemo(() => {
    return loadingState.includes(id);
  }, [loadingState, id])

  const setLoading = useCallback((loading: boolean) => {
    const list = cloneDeep(loadingState);
    if(loading) {
      if(!list.includes(id)) list.push(id);
    }else{
      remove(list, (i) => i === id);
    }
    setLoadingState(list);
  }, [loadingState, setLoadingState, id]);

  return [loading, setLoading];
}
