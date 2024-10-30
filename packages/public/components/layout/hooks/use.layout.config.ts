import {useEffect} from "react";
import {useSetRecoilState} from "recoil";
import {layoutConfigState} from "@clover/public/state/layout";

export const useLayoutConfig = <T>(config: T) => {
    const setConfig = useSetRecoilState(layoutConfigState);
    useEffect(() => {
        setConfig(config);
        return () => {
            setConfig(null);
        }
    }, [setConfig])
}
