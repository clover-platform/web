import { type FC, useCallback } from 'react'
import { IconProject } from '@arco-iconbox/react-clover'
import type { Project } from '@clover/public/types/project'

export type ProjectItemProps = {
  project: Project
}

export const ProjectItem: FC<ProjectItemProps> = (props) => {
  const { project } = props

  const onClick = useCallback(() => {
    console.log(project)
  }, [project])

  return (
    <div className="group flex cursor-default items-center justify-center space-x-2 rounded-md p-1.5 hover:bg-secondary">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white" onClick={onClick}>
        {project.cover ? (
          // biome-ignore lint/performance/noImgElement: Cover
          <img alt="Cover" className="h-full w-full object-cover" src={project.cover} />
        ) : (
          <IconProject />
        )}
      </div>
      <div className="flex-1" onClick={onClick}>
        <span>{project.name}</span>
        <span className="ml-1 opacity-60">@{project.projectKey}</span>
      </div>
    </div>
  )
}
