import { Skeleton } from '@easykit/design'
import { ProjectItemLoading } from '../../../project/item/loading'

export const ProjectGroupLoading = () => {
  return (
    <div className="flex flex-col gap-xs">
      <div className="font-medium text-secondary-foreground/50 text-sm">
        <Skeleton className="h-4 w-24" />
      </div>
      <div>
        {[1, 2, 3].map((key) => (
          <ProjectItemLoading key={key} />
        ))}
      </div>
    </div>
  )
}
