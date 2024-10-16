import {useRecoilValue} from "recoil";
import {layoutConfigState} from "@clover/public/state/layout";
import {useMemo} from "react";

export const useLayoutProps = <T>(originProps: T): T => {
    const config = useRecoilValue(layoutConfigState);
    return useMemo<T>(() => {
        return {
            ...originProps,
            ...config,
        }
    }, [config, originProps]);
}
