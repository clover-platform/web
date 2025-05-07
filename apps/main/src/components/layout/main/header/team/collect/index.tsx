import {t} from "@clover/public/utils/i18next";
import {Empty} from "@easykit/design";
import {CollectTeamItem} from "@/components/layout/main/header/team/collect/item";
import {useCollectTeam} from "@/hooks/use.collect.team";
import {CollectLoadingItem} from "@/components/layout/main/header/collect-loading";

export const TeamCollect = () => {
  const { loading, collect } = useCollectTeam();
  return <div>
    {
      loading ? [0, 1, 2].map((k) => <CollectLoadingItem key={k} />) :
        (
          collect?.length ? collect.map((team) => <CollectTeamItem key={team.id} team={team}/>) :
            <Empty text={t("你关注的团队在此处显示")}/>
        )
    }
  </div>
}
