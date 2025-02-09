import { useAtom } from "jotai";
import { sidebarOpenState } from "@clover/public/components/layout/main-v1/state";

export const useSidebarState = () => {
    const [open] = useAtom(sidebarOpenState);
    return open;
}
