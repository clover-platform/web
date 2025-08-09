import { Empty } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { CollectLoadingItem } from '@/components/layout/main/header/collect-loading'
import { CollectTeamItem } from '@/components/layout/main/header/team/collect/item'
import { useCollectTeam } from '@/hooks/use.collect.team'
export const TeamCollect = () => {
  const { loading, collect } = useCollectTeam()
  const { t } = useTranslation()
  return (
    <div>
      {loading ? (
        [0, 1, 2].map((k) => <CollectLoadingItem key={k} />)
      ) : collect?.length ? (
        collect.map((team) => <CollectTeamItem key={team.id} team={team} />)
      ) : (
        <Empty text={t('你关注的团队在此处显示')} />
      )}
    </div>
  )
}
