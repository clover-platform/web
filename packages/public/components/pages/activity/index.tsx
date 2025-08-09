import { ActivityGroupLoading } from './group/loading'

import { type FC, useEffect, useMemo } from 'react'
import { Button, Empty } from '@easykit/design'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { ActivityGroupItem } from '@clover/public/components/pages/activity/group'
import { useTimeAgo } from '@clover/public/hooks'
import type { Activity, ActivityGroup } from '@clover/public/types/activity'
import type { PageData } from '@clover/public/types/rest'

export type ActivityListProps = {
  queryFn: (params: { pageParam: number; size: number }) => Promise<PageData<Activity> | undefined>
}

export const PAGE_SIZE = 5

export const ActivityList: FC<ActivityListProps> = (props) => {
  const { queryFn } = props
  const timeAgo = useTimeAgo()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery({
    queryKey: ['module:activity'],
    queryFn: ({ pageParam = 1 }) => queryFn({ pageParam, size: PAGE_SIZE }),
    getNextPageParam: (lastPage, pages) =>
      (lastPage?.total || 0) > pages.length * PAGE_SIZE ? pages.length + 1 : undefined,
    initialPageParam: 1,
  })

  const pageList = useMemo(() => {
    return data?.pages.flatMap((page) => page?.data || []) || []
  }, [data])

  const items = useMemo<ActivityGroup[]>(() => {
    // 新的分组逻辑
    const groupedByFormatted: { [formatted: string]: { time: string; formatted: string; list: Activity[] } } = {}
    for (const activity of pageList) {
      const time = dayjs(activity.createTime).format('YYYY-MM-DD HH:mm:ss')
      const formatted = timeAgo.format(new Date(time))
      if (!groupedByFormatted[formatted]) {
        groupedByFormatted[formatted] = { time, formatted, list: [] }
      }
      groupedByFormatted[formatted].list.push(activity)
    }

    // 按 time 字段倒序排序
    return Object.values(groupedByFormatted).sort((a, b) => dayjs(b.time).diff(dayjs(a.time)))
  }, [pageList, timeAgo])

  const loading = isLoading || isFetching

  useEffect(() => {
    return () => {
      // 使用 removeQueries 完全清除缓存，而不是 invalidateQueries
      queryClient.removeQueries({ queryKey: ['module:activity'] })
    }
  }, [queryClient])

  return (
    <div className="flex flex-col gap-6">
      {!loading && items.length === 0 && <Empty text={t('暂无动态')} />}
      {items.map((item) => (
        <ActivityGroupItem data={item} key={item.time} />
      ))}
      {loading && [1, 2, 3].map((item) => <ActivityGroupLoading key={item} />)}
      {!loading && hasNextPage ? (
        <div className="flex w-full justify-center">
          <Button onClick={() => fetchNextPage()} variant="link">
            {t('加载更多')}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
