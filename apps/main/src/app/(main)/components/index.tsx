'use client'

import { MainPage } from '@/components/common/main-page'
import type { MainLayoutProps } from '@/components/layout/main'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'

export const DashboardPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'dashboard',
  })
  return <MainPage>DashboardPage</MainPage>
}
