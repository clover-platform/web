import type { FC } from 'react'
import { ProjectItem } from '../../project/item'
import type { ProjectGroup as ProjectGroupType } from '../types'

export type ProjectGroupProps = {
  item: ProjectGroupType
}
export const ProjectGroup: FC<ProjectGroupProps> = (props) => {
  const { item } = props
  return (
    <div className="flex flex-col gap-xs">
      <div className="font-medium text-secondary-foreground/50 text-sm">{item.formatted}</div>
      <div>
        {item.list.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
