import { type FC, useEffect, useMemo } from 'react'
import { Loading, Select, type SelectProps } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { useFetch } from '@clover/public/hooks'
import { myByTeamId } from '@clover/public/rest/team'
import type { Project } from '@clover/public/types/project'

export type ProjectSelectorProps = Omit<SelectProps, 'options'> & {
  teamId: string | number
}

export const ProjectSelector: FC<ProjectSelectorProps> = (props) => {
  const { value, teamId, ...rest } = props
  const { loading, load, result } = useFetch<Project[]>(myByTeamId)
  const { t } = useTranslation()
  const options = useMemo(() => {
    return (
      result?.map((project) => {
        return {
          label: project.name,
          value: `${project.id}`,
        }
      }) || []
    )
  }, [result])

  useEffect(() => {
    if (teamId) {
      load(teamId).then()
    }
  }, [teamId, load])

  return (
    <Loading loading={loading}>
      <Select placeholder={t('请选择')} {...rest} options={options} value={value} />
    </Loading>
  )
}
