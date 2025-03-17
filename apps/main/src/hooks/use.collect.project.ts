import {
  loadedProjectCollectState,
  projectCollectState,
} from "@/state/collect";
import { useAtom } from "jotai";
import {useCallback, useEffect, useState} from "react";
import {myCollect} from "@/rest/project";

export const useCollectProject = () => {
  const [loaded, setLoaded] = useAtom(loadedProjectCollectState);
  const [projectCollect, setProjectCollect] = useAtom(projectCollectState);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoaded(true);
    const { success, data } = await myCollect();
    if(success) {
      setProjectCollect(data!);
    }
    setLoading(false);
  }, [setLoaded, setProjectCollect])

  useEffect(() => {
    if(!loaded) {
      load().then();
    }
  }, [loaded, load]);

  return { loaded, loading, load, collect: projectCollect };
}
