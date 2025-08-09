import { ProjectGroup } from './group'
import { ProjectGroupLoading } from './group/loading'
import type { ProjectGroup as ProjectGroupType } from './types'

import { useMemo } from 'react'
import { Button, Empty, Input, ScrollArea } from '@easykit/design'
import { useInfiniteQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useTimeAgo } from '@clover/public/hooks'
import type { Project } from '@clover/public/types/project'
import { recent } from '@/rest/project'

export const PAGE_SIZE = 5

export const RecentPanel = () => {
  const timeAgo = useTimeAgo()
  const { t } = useTranslation()
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery({
    queryKey: ['project', 'recent'],
    queryFn: ({ pageParam = 1 }) => recent({ page: pageParam, size: PAGE_SIZE }),
    getNextPageParam: (lastPage, pages) =>
      (lastPage?.total || 0) > pages.length * PAGE_SIZE ? pages.length + 1 : undefined,
    initialPageParam: 1,
  })

  const pageList = useMemo(() => {
    return data?.pages.flatMap((page) => page?.data || []) || []
  }, [data])

  const items = useMemo<ProjectGroupType[]>(() => {
    // 新的分组逻辑
    const groupedByFormatted: { [formatted: string]: { time: string; formatted: string; list: Project[] } } = {}
    for (const project of pageList) {
      const time = dayjs(project.lastActivityTime).format('YYYY-MM-DD HH:mm:ss')
      const formatted = timeAgo.format(new Date(time))
      if (!groupedByFormatted[formatted]) {
        groupedByFormatted[formatted] = { time, formatted, list: [] }
      }
      groupedByFormatted[formatted].list.push(project)
    }

    // 按 time 字段倒序排序
    return Object.values(groupedByFormatted).sort((a, b) => dayjs(b.time).diff(dayjs(a.time)))
  }, [pageList, timeAgo])

  const loading = isLoading || isFetching

  return (
    <div className="flex flex-col gap-md">
      <div className="font-medium">{t('最近')}</div>
      <div>
        <Input placeholder={t('搜索')} />
      </div>
      <ScrollArea className="[&>div]:max-h-[60vh]">
        {loading ? (
          <div className="flex flex-col gap-sm">
            {[1, 2].map((item) => (
              <ProjectGroupLoading key={item} />
            ))}
          </div>
        ) : (
          <>
            {items.length === 0 && <Empty text={t('暂无动态')} />}
            <div className="flex flex-col gap-sm">
              {items.map((item) => (
                <ProjectGroup item={item} key={item.time} />
              ))}
            </div>
            {hasNextPage ? (
              <div className="flex w-full justify-center">
                <Button onClick={() => fetchNextPage()} variant="link">
                  {t('加载更多')}
                </Button>
              </div>
            ) : null}
          </>
        )}
      </ScrollArea>
    </div>
  )
}
