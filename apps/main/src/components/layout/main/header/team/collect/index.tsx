import {tt} from "@clover/public/locale";
import {Empty} from "@easykit/design";
import React, {useEffect} from "react";
import {useFetch} from "@clover/public/hooks";
import {myCollect} from "@/rest/team";
import {CollectTeamLoadingItem} from "@/components/layout/main/header/team/collect/item/loading";
import {CollectTeamItem} from "@/components/layout/main/header/team/collect/item";

export const TeamCollect = () => {
  const { loading, load, result } = useFetch(myCollect, {initLoading: true});
  useEffect(() => {
    load().then();
  }, [load])
  return <div>
    {
      loading ? [0, 1, 2].map((k) => <CollectTeamLoadingItem key={k} />) :
        (
          result?.length ? result.map((team) => <CollectTeamItem key={team.id} team={team}/>) :
            <Empty text={tt("你关注的团队在此处显示")}/>
        )
    }
  </div>
}
