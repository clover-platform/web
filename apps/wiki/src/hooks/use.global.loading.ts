import {RecoilState, useRecoilState} from "recoil";
import {useCallback, useMemo} from "react";
import cloneDeep from "lodash/cloneDeep";
import remove from "lodash/remove";

export type GlobalLoadingResult = [boolean, (loading: boolean) => void];

export const useGlobalLoading = (state: RecoilState<number[]>, id: number): GlobalLoadingResult => {
    const [loadingState, setLoadingState] = useRecoilState(state);
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
    }, [loadingState, setLoadingState, id])
    return [loading, setLoading];
}
