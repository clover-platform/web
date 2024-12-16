import { useAtom } from "jotai";
import { loadingState } from "@clover/public//components/layout/main/state";
import { useRef } from "react";
import { useFetchIntercept } from "@clover/public/hooks/use.fetch.intercept";

export const AdminLayoutLoading = () => {
    const [_, setLoading] = useAtom(loadingState);
    const timerRef = useRef<any>(undefined);

    useFetchIntercept({
        start: () => {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setLoading(true);
            }, 50);
        },
        done: () => {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setLoading(false);
            }, 50);
        }
    });
    return null;
}
