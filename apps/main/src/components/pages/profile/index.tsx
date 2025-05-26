'use client';

import { AppBreadcrumb } from '@/components/common/app-breadcrumb'
import type { MainLayoutProps } from '@/components/layout/main'
import { MainPage } from '@clover/public/components/common/page'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { BreadcrumbItem, BreadcrumbPage } from '@easykit/design'
import { useTranslation } from 'react-i18next'

export const ProfilePage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'profile',
  })
  const { t } = useTranslation()
  return (
    <MainPage>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{t('个人资料')}</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
    </MainPage>
  )
}
