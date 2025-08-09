import { type FC, useCallback } from 'react'
import { IconProject } from '@arco-iconbox/react-clover'
import { useRouter } from 'next/navigation'
import type { Project } from '@clover/public/types/project'
export type CollectProjectItemProps = {
  project: Project
}

export const CollectProjectItem: FC<CollectProjectItemProps> = (props) => {
  const { project } = props
  const router = useRouter()

  const onClick = useCallback(() => {
    router.push(`/team/${project.projectKey}?tab=info`)
  }, [router, project.projectKey])

  return (
    <div className="group flex cursor-pointer items-center justify-center space-x-2 rounded-md p-2 hover:bg-secondary">
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
