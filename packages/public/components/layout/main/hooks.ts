import { useAtom } from "jotai";
import { sidebarOpenState } from "@clover/public/components/layout/main/state";

export const useSidebarState = () => {
    const [open] = useAtom(sidebarOpenState);
    return open;
}
