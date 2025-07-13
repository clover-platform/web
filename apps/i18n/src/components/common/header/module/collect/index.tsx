import { useCollectModule } from '@/hooks/use.collect.module'
import { Empty } from "@easykit/design"
import { useTranslation } from "react-i18next"
import { CollectModuleItem } from './item'
import { CollectLoadingItem } from './loading'

export const ModuleCollect = () => {
  const { t } = useTranslation()
  const { collect, loading } = useCollectModule()

  return (
    <div>
      {loading ? (
        [0, 1, 2].map((k) => <CollectLoadingItem key={k} />)
      ) : collect?.length ? (
        collect.map((module) => <CollectModuleItem key={module.id} module={module} />)
      ) : (
        <Empty text={t('你关注的模块在此处显示')} />
      )}
    </div>
  )
}