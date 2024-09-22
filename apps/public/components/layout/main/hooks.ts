import { useRecoilValue } from "recoil";
import { sidebarOpenState } from "@clover/public/components/layout/main/state";

export const useSidebarState = () => {
    return useRecoilValue(sidebarOpenState)
}
