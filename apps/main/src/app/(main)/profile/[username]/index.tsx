'use client'

import { AppBreadcrumb } from '@/components/common/app-breadcrumb'
import type { MainLayoutProps } from '@/components/layout/main'
import { IconMember } from '@arco-iconbox/react-clover'
import { MainPage } from '@clover/public/components/common/page'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { Avatar, BreadcrumbItem, BreadcrumbPage, Button, Card } from '@easykit/design'
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
      <div className="flex flex-row gap-4">
        <div className="flex w-[300px] flex-col gap-4">
          <Avatar className="h-[300px] w-full" src="https://github.com/shadcn.png" />
          <div>
            <div className="font-bold text-2xl">Grant</div>
            <div className="text-base text-gray-500">su</div>
          </div>
          <div className="text-base text-gray-500">Managers are a group of unreliable AI agents</div>
          <Button variant="outline">{t('编辑资料')}</Button>
          <div className="flex flex-row items-center gap-2">
            <IconMember />
            <span>100 followers</span>
            <span>100 following</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <Card title={t('个人资料')}>test</Card>
          <Card title={t('我的收藏')}>test</Card>
        </div>
      </div>
    </MainPage>
  )
}