import {tt} from "@clover/public/locale";
import {Empty} from "@easykit/design";
import {CollectTeamLoadingItem} from "@/components/layout/main/header/team/collect/item/loading";
import {CollectTeamItem} from "@/components/layout/main/header/team/collect/item";
import {useCollectTeam} from "@/hooks/use.collect.team";

export const TeamCollect = () => {
  const { loading, collect } = useCollectTeam();
  return <div>
    {
      loading ? [0, 1, 2].map((k) => <CollectTeamLoadingItem key={k} />) :
        (
          collect?.length ? collect.map((team) => <CollectTeamItem key={team.id} team={team}/>) :
            <Empty text={tt("你关注的团队在此处显示")}/>
        )
    }
  </div>
}
