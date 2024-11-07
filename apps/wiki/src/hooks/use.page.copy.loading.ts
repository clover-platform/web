import {GlobalLoadingResult, useGlobalLoading} from "@/hooks/use.global.loading";
import {copyLoadingState as state} from "@/state/page";

export const usePageCopyLoading = (id: number): GlobalLoadingResult => {
    return useGlobalLoading(state, id);
}
