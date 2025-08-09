'use client'

import { ProfileAction } from './action'
import { Avatar } from './avatar'
import { ReadMe } from './readme'

import { IconMember } from '@arco-iconbox/react-clover'
import { BreadcrumbItem, BreadcrumbPage, Empty, Tabs, TabsContent, TabsList, TabsTrigger } from '@easykit/design'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@clover/public/components/common/page/header'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { AppBreadcrumb } from '@/components/common/app-breadcrumb'
import { MainPage } from '@/components/common/main-page'
import type { MainLayoutProps } from '@/components/layout/main'
import { profile } from '@/rest/profile'

export const ProfilePage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'profile',
  })
  const { t } = useTranslation()
  const { username } = useParams()
  const { data: account } = useQuery({
    queryKey: ['profile', username],
    queryFn: ({ queryKey }) => profile(queryKey[1] as string),
  })

  return (
    <MainPage>
      <PageHeader>
        <AppBreadcrumb>
          <BreadcrumbItem>
            <BreadcrumbPage>{t('个人资料')}</BreadcrumbPage>
          </BreadcrumbItem>
        </AppBreadcrumb>
        <div className="flex flex-row items-start gap-4">
          <Avatar fallback={account?.username!} id={account?.id!} src={account?.avatar!} />
          <div className="flex-1">
            <div className="font-bold text-2xl">{account?.username}</div>
            <div className="text-base text-gray-500">{account?.email}</div>
          </div>
          <ProfileAction />
        </div>
      </PageHeader>
      <div className="container">
        <div className="flex flex-row gap-4">
          <div className="flex w-[300px] flex-col gap-4">
            {account?.memo ? <div className="text-base text-gray-500">{account.memo}</div> : null}
            <div className="flex flex-row items-center gap-2">
              <IconMember />
              <span>100 followers</span>
              <span>100 following</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <ReadMe id={account?.id!} readme={account?.readme} />
            <div className="flex flex-col gap-2">
              <div className="font-bold text-lg">{t('收藏')}</div>
              <Tabs defaultValue="team">
                <TabsList className="grid grid-cols-2 bg-black/5 dark:bg-white/5">
                  <TabsTrigger value="team">{t('团队')}</TabsTrigger>
                  <TabsTrigger value="project">{t('项目')}</TabsTrigger>
                </TabsList>
                <TabsContent value="team">
                  <Empty text={t('暂无关注团队')} />
                </TabsContent>
                <TabsContent value="project">
                  <Empty text={t('暂无关注项目')} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  )
}
