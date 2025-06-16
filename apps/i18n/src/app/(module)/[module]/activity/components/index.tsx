'use client'

import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'
import { useModule } from '@/hooks/use.module'
import { list as listRest } from '@/rest/activity'
import type { Activity, ActivityGroup } from '@/types/module/activity'
import { MainPage } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { BreadcrumbItem, BreadcrumbPage, Button, Card } from '@easykit/design'
import { useInfiniteQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityList } from './list'

export const ActivityPage = () => {
  const { t } = useTranslation()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'activity',
  })
  const m = useModule()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: loading,
  } = useInfiniteQuery({
    queryKey: ['module: activity', m],
    queryFn: ({ pageParam = 1 }) => listRest({ page: pageParam, size: 10, module: m }),
    getNextPageParam: (lastPage, pages) => ((lastPage?.total || 0) > pages.length * 10 ? pages.length + 1 : undefined),
    initialPageParam: 1,
  })

  const list = useMemo(() => {
    return data?.pages.flatMap((page) => page?.data || []) || []
  }, [data])

  const items = useMemo<ActivityGroup[]>(() => {
    // 分组逻辑
    const groupedByFormattedCreateTime = list.reduce(
      (accumulator: { [key: string]: Activity[] }, currentValue: Activity) => {
        const formattedDate = dayjs(currentValue.createTime).format('YYYY-MM-DD')
        if (!accumulator[formattedDate]) {
          accumulator[formattedDate] = []
        }
        accumulator[formattedDate].push(currentValue)
        return accumulator
      },
      {}
    )

    // 对键进行倒序排序
    const sortedKeys = Object.keys(groupedByFormattedCreateTime).sort((a, b) => dayjs(b).diff(dayjs(a)))

    // 根据排序后的键组织成新的数组
    return sortedKeys.map((key) => ({
      time: key,
      list: groupedByFormattedCreateTime[key],
    }))
  }, [list])

  const title = t('动态')

  return (
    <MainPage>
      <ModuleBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </ModuleBreadcrumb>
      <TitleBar title={title} border={false} />
      <Card>
        <ActivityList loading={loading} items={items} />
        {!loading && hasNextPage ? (
          <div className="flex w-full justify-center">
            <Button onClick={() => fetchNextPage()} variant="link">
              {t('加载更多')}
            </Button>
          </div>
        ) : null}
      </Card>
    </MainPage>
  )
}
