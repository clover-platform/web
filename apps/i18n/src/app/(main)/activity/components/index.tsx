'use client'

import { BreadcrumbItem, BreadcrumbPage, Card } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { MainPage } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { ActivityList } from '@clover/public/components/pages/activity'
import { AppBreadcrumb } from '@/components/common/breadcrumb/app'
import type { MainLayoutProps } from '@/components/layout/main'
import { list } from '@/rest/activity'

export const ActivityPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'activity',
  })
  const { t } = useTranslation()
  const title = t('动态')

  return (
    <MainPage>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <TitleBar title={title} />
      <Card>
        <ActivityList queryFn={({ pageParam, size }) => list({ page: pageParam, size })} />
      </Card>
    </MainPage>
  )
}
