'use client'

import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'
import { list as listRest } from '@/rest/activity'
import { MainPage } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { ActivityList } from '@clover/public/components/pages/activity'
import { BreadcrumbItem, BreadcrumbPage, Card } from '@easykit/design'
import { useTranslation } from 'react-i18next'

export const ActivityPage = () => {
  const { t } = useTranslation()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'activity',
  })

  const title = t('动态')

  return (
    <MainPage>
      <ModuleBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </ModuleBreadcrumb>
      <TitleBar title={title} />
      <Card>
        <ActivityList queryFn={({ pageParam, size }) => listRest({ page: pageParam, size })} />
      </Card>
    </MainPage>
  )
}
