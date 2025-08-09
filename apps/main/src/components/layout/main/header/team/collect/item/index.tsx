import { type FC, useCallback } from 'react'
import { IconSwitch, IconTeam } from '@arco-iconbox/react-clover'
import { Action, Badge, Tooltip } from '@easykit/design'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { ProjectSwitcher } from '@clover/public/components/common/switcher/project'
import { useCurrent } from '@clover/public/components/layout/hooks/main'
import type { Team } from '@clover/public/types/team'

export type CollectTeamItemProps = {
  team: Team
}

export const CollectTeamItem: FC<CollectTeamItemProps> = (props) => {
  const { team } = props
  const { teamId } = useCurrent()
  const router = useRouter()
  const { t } = useTranslation()

  const onClick = useCallback(() => {
    router.push(`/team/${team.teamKey}?tab=info`)
  }, [router, team.teamKey])

  return (
    <div className="group flex cursor-pointer items-center justify-center space-x-2 rounded-md p-2 hover:bg-secondary">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white" onClick={onClick}>
        {/** biome-ignore lint/performance/noImgElement: Cover */}
        {team.cover ? <img alt="Cover" className="h-full w-full object-cover" src={team.cover} /> : <IconTeam />}
      </div>
      <div className="flex-1" onClick={onClick}>
        <span>{team.name}</span>
        <span className="ml-1 opacity-60">@{team.teamKey}</span>
      </div>
      {team.id === teamId ? (
        <div>
          <Badge>{t('当前')}</Badge>
        </div>
      ) : (
        <div className="hidden group-hover:flex">
          <Tooltip content={t('切换到此团队')}>
            <ProjectSwitcher teamId={team.id} title={t('切换团队')}>
              <Action className="!p-1.5">
                <IconSwitch />
              </Action>
            </ProjectSwitcher>
          </Tooltip>
        </div>
      )}
    </div>
  )
}
