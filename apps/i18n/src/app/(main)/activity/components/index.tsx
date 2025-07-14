'use client'

import { AppBreadcrumb } from '@/components/common/breadcrumb/app'
import type { MainLayoutProps } from '@/components/layout/main'
import { list } from '@/rest/activity'
import { MainPage } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { BreadcrumbItem, BreadcrumbPage, Card } from '@easykit/design'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export const ActivityPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'activity',
  })
  const { t } = useTranslation()
  const title = t('动态')
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: loading,
  } = useInfiniteQuery({
    queryKey: ['module: activity'],
    queryFn: ({ pageParam = 1 }) => list({ page: pageParam, size: 10 }),
    getNextPageParam: (lastPage, pages) => ((lastPage?.total || 0) > pages.length * 10 ? pages.length + 1 : undefined),
    initialPageParam: 1,
  })

  console.log(data)

  return (
    <MainPage>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <TitleBar title={title} />
      <Card>test</Card>
    </MainPage>
  )
}