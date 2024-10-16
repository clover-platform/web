import { useSetRecoilState } from "recoil";
import { loadingState } from "@clover/public//components/layout/main/state";
import { useRef } from "react";
import { useFetchIntercept } from "@easykit/common/hooks/use.fetch.intercept";

export const AdminLayoutLoading = () => {
    const setLoading = useSetRecoilState(loadingState);
    const timerRef = useRef<any>();

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
