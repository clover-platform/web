import { ProjectItemPanel } from './item/panel'

import { useMemo } from 'react'
import { Skeleton } from '@easykit/design'
import { useQuery } from '@tanstack/react-query'
import { panel } from '@/rest/project'

export const ProjectPanel = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['project', 'panel'],
    queryFn: () => panel(),
  })
  const recents = useMemo(() => data?.recents || [], [data])
  const collects = useMemo(() => data?.collects || [], [data])
  const projects = useMemo(() => data?.projects || [], [data])

  return (
    <div className="flex flex-col gap-1 pb-1 pl-lg">
      {isLoading ? (
        [1, 2].map((i) => (
          <div className="flex flex-col gap-1" key={`loading-${i}`}>
            <div className="pt-1 font-medium text-muted-foreground text-sm">
              <Skeleton className="h-5 w-20" />
            </div>
            {[1, 2, 3].map((j) => (
              <div className="py-1" key={`loading-${j}`}>
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
        ))
      ) : (
        <>
          {recents.length > 0 && (
            <div className="flex flex-col gap-1">
              <div className="pt-1 font-medium text-muted-foreground text-sm">最近项目</div>
              {recents.map((recent) => (
                <ProjectItemPanel key={`recent-${recent.id}`} project={recent} />
              ))}
            </div>
          )}
          {collects.length > 0 && (
            <div className="flex flex-col gap-1">
              <div className="pt-1 font-medium text-muted-foreground text-sm">收藏项目</div>
              {collects.map((collect) => (
                <ProjectItemPanel key={`collect-${collect.id}`} project={collect} />
              ))}
            </div>
          )}
          {projects.length > 0 && (
            <div className="flex flex-col gap-1">
              {projects.map((project) => (
                <ProjectItemPanel key={project.id} project={project} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
