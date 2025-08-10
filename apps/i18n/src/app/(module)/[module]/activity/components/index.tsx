'use client'

import { BreadcrumbItem, BreadcrumbPage, Card } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { MainPage } from '@clover/public/components/common/page'
import { PageHeader } from '@clover/public/components/common/page/header'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { ActivityList } from '@clover/public/components/pages/activity'
import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'
import { list as listRest } from '@/rest/activity'

export const ActivityPage = () => {
  const { t } = useTranslation()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'activity',
  })

  const title = t('动态')

  return (
    <MainPage>
      <PageHeader>
        <ModuleBreadcrumb>
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </ModuleBreadcrumb>
        <TitleBar title={title} />
      </PageHeader>
      <div className="container">
        <Card>
          <ActivityList queryFn={({ pageParam, size }) => listRest({ page: pageParam, size })} />
        </Card>
      </div>
    </MainPage>
  )
}
