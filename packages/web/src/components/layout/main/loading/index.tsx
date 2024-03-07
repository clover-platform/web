import { useSetRecoilState } from "recoil";
import { loadingState } from "@/components/layout/main/state";
import { useNavigationEvents } from "@easy-kit/common/hooks/use.navigation.events";
import { useRef } from "react";

export const AdminLayoutLoading = () => {
    const setLoading = useSetRecoilState(loadingState);
    const timerRef = useRef<any>();

    useNavigationEvents({
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
    })
    return null;
}
