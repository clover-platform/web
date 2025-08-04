import { useCollectProject } from '@/hooks/use.collect.project'
import { Empty, Input } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { CollectItem } from './item'
import { CollectItemLoading } from './item/loading'

export const CollectPanel = () => {
  const { t } = useTranslation()
  const { loading, collect } = useCollectProject()
  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium">{t('已收藏')}</div>
      <div>
        <Input placeholder={t('搜索')} />
      </div>
      <div>
        {loading ? (
          [0, 1, 2].map((k) => <CollectItemLoading key={k} />)
        ) : collect?.length ? (
          collect.map((project) => <CollectItem key={project.id} project={project} />)
        ) : (
          <Empty text={t('你关注的项目在此处显示')} />
        )}
      </div>
    </div>
  )
}
