'use client'

import { MainPage } from '@/components/common/main-page'
import type { MainLayoutProps } from '@/components/layout/main'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useTranslation } from 'react-i18next'
import { Activity } from './activity'
import { Recent } from './recent'

export const DashboardPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'dashboard',
  })
  const { t } = useTranslation()
  return (
    <MainPage>
      <TitleBar title={t('您的工作')} />
      <Recent />
      <Activity />
    </MainPage>
  )
}
