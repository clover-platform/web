'use client'

import { MainPage } from '@/components/common/main-page'
import type { MainLayoutProps } from '@/components/layout/main'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useTranslation } from 'react-i18next'

export const DashboardPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'dashboard',
  })
  const { t } = useTranslation()
  return (
    <MainPage>
      <TitleBar title={t('您的工作')} />
      <div>
        <div>
          <span>{t('最近的项目')}</span>
          <a href="/project">{t('查看全部')}</a>
        </div>
      </div>
    </MainPage>
  )
}
