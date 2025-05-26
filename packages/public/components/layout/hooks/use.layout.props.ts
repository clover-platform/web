import {layoutConfigState} from "@clover/public/state/layout";
import { useAtom } from 'jotai'
import {useMemo} from "react";

export const useLayoutProps = <T>(originProps: T): T => {
  const [config] = useAtom(layoutConfigState);
  return useMemo<T>(() => {
    return {
      ...originProps,
      ...config,
    }
  }, [config, originProps])
}
