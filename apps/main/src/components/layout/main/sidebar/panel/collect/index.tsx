import { useCollectProject } from '@/hooks/use.collect.project'
import { Empty, Input, ScrollArea } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { ProjectItem } from '../project/item'
import { ProjectItemLoading } from '../project/item/loading'

export const CollectPanel = () => {
  const { t } = useTranslation()
  const { loading, collect } = useCollectProject()
  return (
    <div className="flex flex-col gap-md">
      <div className="font-medium">{t('已收藏')}</div>
      <div>
        <Input placeholder={t('搜索')} />
      </div>
      <ScrollArea className="[&>div]:max-h-[60vh]">
        {loading ? (
          [0, 1, 2].map((k) => <ProjectItemLoading key={k} />)
        ) : collect?.length ? (
          collect.map((project) => <ProjectItem key={project.id} project={project} />)
        ) : (
          <Empty text={t('你关注的项目在此处显示')} />
        )}
      </ScrollArea>
    </div>
  )
}
