import { type FC, useMemo } from 'react'
import { Select, type SelectOptionProps, type SelectProps } from '@easykit/design'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { teamsState } from '@clover/public/state/public'

export type TeamSelectorProps = Omit<SelectProps, 'options'>

export const TeamSelector: FC<TeamSelectorProps> = (props) => {
  const teams = useAtomValue(teamsState)
  const { t } = useTranslation()
  const options = useMemo<SelectOptionProps[]>(() => {
    return teams.map((team) => {
      return {
        label: (
          <div className="flex flex-row items-center">
            <span>{team.name}</span>
            <span className="text-secondary-foreground/60 text-xs">{`@${team.teamKey}`}</span>
          </div>
        ),
        value: `${team.id}`,
      }
    })
  }, [teams])
  return <Select allowClear className="min-w-48 max-w-96" options={options} placeholder={t('请选择')} {...props} />
}
