'use client'

import { AppBreadcrumb } from '@/components/common/app-breadcrumb'
import type { MainLayoutProps } from '@/components/layout/main'
import { MainPage } from '@clover/public/components/common/page'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { BreadcrumbItem, BreadcrumbPage } from '@easykit/design'
import { useTranslation } from 'react-i18next'
import { Activity } from './activity'
import { Assistant } from './assistant'
import { Collect } from './collect'

export const DashboardPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'dashboard',
  })
  const { t } = useTranslation()

  return (
    <MainPage>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{t('概览')}</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <div className="flex items-start justify-start space-x-md">
        <div className="flex-1 space-y-md">
          <Assistant />
          <Activity />
        </div>
        <div className="w-96">
          <Collect />
        </div>
      </div>
    </MainPage>
  )
}
