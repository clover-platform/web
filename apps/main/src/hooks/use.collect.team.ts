import {initTeamCollectState, teamCollectState} from "@/state/collect";
import { useAtom } from "jotai";
import {useCallback, useEffect, useState} from "react";
import {myCollect} from "@/rest/team";

export const useCollectTeam = () => {
  const [inited, setInited] = useAtom(initTeamCollectState);
  const [teamCollect, setTeamCollect] = useAtom(teamCollectState);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setInited(true);
    const { success, data } = await myCollect();
    if(success) {
      setTeamCollect(data!);
    }
    setLoading(false);
  }, [setInited, setTeamCollect])

  useEffect(() => {
    if(!inited) {
      load().then();
    }
  }, [inited, load]);

  return { inited, loading, load, collect: teamCollect };
}
