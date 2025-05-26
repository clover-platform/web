import { myCollect } from '@/rest/team'
import {loadedTeamCollectState, teamCollectState} from "@/state/collect";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from 'react'

export const useCollectTeam = () => {
  const [loaded, setLoaded] = useAtom(loadedTeamCollectState);
  const [teamCollect, setTeamCollect] = useAtom(teamCollectState);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoaded(true);
    const { success, data } = await myCollect();
    if(success) {
      setTeamCollect(data!);
    }
    setLoading(false);
  }, [setLoaded, setTeamCollect])

  useEffect(() => {
    if (!loaded) {
      load().then()
    }
  }, [loaded, load]);

  return { loaded, loading, load, collect: teamCollect };
}
