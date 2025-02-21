import {useEffect} from "react";
import {useAtom} from "jotai";
import {layoutConfigState} from "@clover/public/state/layout";

export const useLayoutConfig = <T>(config: T) => {
  const [_, setConfig] = useAtom(layoutConfigState);
  useEffect(() => {
    setConfig(config);
    return () => {
      setConfig(null);
    }
  }, [setConfig])
}
