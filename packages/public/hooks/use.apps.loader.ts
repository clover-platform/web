import { type AppsItemProps, apps as appsRest } from '@clover/public/rest/config'
import {appsState, loadingState} from "@clover/public/state/apps";
import { useAtom } from 'jotai'
import { useCallback } from 'react'

export const useAppsLoader = (): {
  loading: boolean;
  apps: AppsItemProps[];
  load: () => Promise<void>;
} => {
  const [loading, setLoading] = useAtom(loadingState);
  const [apps, setApps] = useAtom(appsState);

  const load = useCallback(async () => {
    const {success, data} = await appsRest();
    setLoading(false);
    setApps(success ? data! : [])
  }, [setApps, setLoading])

  return {loading, apps, load};
}
