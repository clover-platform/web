import {loadingState as state} from "@/state/collect";
import {GlobalLoadingResult, useGlobalLoading} from "@/hooks/use.global.loading";

export const useCollectLoading = (id: number): GlobalLoadingResult => {
    return useGlobalLoading(state, id);
}
