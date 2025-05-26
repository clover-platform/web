import {layoutConfigState} from "@clover/public/state/layout";
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

export const useLayoutConfig = <T>(config: T) => {
  const setConfig = useSetAtom(layoutConfigState);
  useEffect(() => {
    setConfig(config)
    return () => {
      setConfig(null)
    }
  }, [config, setConfig]) 
}
