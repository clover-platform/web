import type { FC } from 'react'
import { Action, Avatar } from '@easykit/design'
import type { Project as ProjectType } from '@clover/public/types/project'

export type ProjectItemPanelProps = {
  project: ProjectType
}

export const ProjectItemPanel: FC<ProjectItemPanelProps> = (props) => {
  const { project } = props
  return (
    <Action className="!p-1 -ml-1 flex items-center gap-1">
      <Avatar
        className="size-6.5 rounded-sm"
        fallback={project.name}
        fallbackClassName="rounded-sm bg-primary text-primary-foreground text-xs"
        src={project.cover}
      />
      <div className="flex-1 truncate text-left text-sm">{project.name}</div>
    </Action>
  )
}
