'use client'

import { Activity } from './activity'
import { Recent } from './recent'

import { useTranslation } from 'react-i18next'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { MainPage } from '@/components/common/main-page'
import type { MainLayoutProps } from '@/components/layout/main'

export const DashboardPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'dashboard',
  })
  const { t } = useTranslation()
  return (
    <MainPage className="container">
      <TitleBar title={t('您的工作')} />
      <Recent />
      <Activity />
    </MainPage>
  )
}
