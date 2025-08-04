import { IconProject } from '@arco-iconbox/react-clover'
import type { Project } from '@clover/public/types/project'
import { type FC, useCallback } from 'react'

export type CollectItemProps = {
  project: Project
}

export const CollectItem: FC<CollectItemProps> = (props) => {
  const { project } = props

  const onClick = useCallback(() => {
    console.log(project)
  }, [project])

  return (
    <div className="group flex cursor-pointer items-center justify-center space-x-2 rounded-md p-1.5 hover:bg-secondary">
      <div onClick={onClick} className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
        {project.cover ? (
          // biome-ignore lint/nursery/noImgElement: <explanation>
          <img className="h-full w-full object-cover" alt="Cover" src={project.cover} />
        ) : (
          <IconProject />
        )}
      </div>
      <div onClick={onClick} className="flex-1">
        <span>{project.name}</span>
        <span className="ml-1 opacity-60">@{project.projectKey}</span>
      </div>
    </div>
  )
}
