import {useCallback} from "react";
import {apps as appsRest, AppsItemProps} from "@clover/public/rest/config";
import {useAtom} from "jotai";
import {appsState, loadingState} from "@clover/public/state/apps";

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
    setApps(success ? data! : []);
  }, [setApps, setLoading])

  return {loading, apps, load};
}
