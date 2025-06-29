import { ENTRY_COMMENT_RELOAD } from '@/events/worktop'
import { list as listRest } from '@/rest/entry.comment'
import { currentEntryState, currentLanguageState, entriesState, filesState } from '@/state/worktop'
import bus from '@clover/public/events'
import { Button, Empty, ScrollArea } from '@easykit/design'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CommentListItem } from './item'
import { CommentListItemLoading } from './item/loading'

const CommentListLoading = () => {
  return [0, 1, 2].map((index) => <CommentListItemLoading key={index} />)
}

export const CommentList = () => {
  const [entries] = useAtom(entriesState)
  const [current] = useAtom(currentEntryState)
  const entry = entries[current]
  const [language] = useAtom(currentLanguageState)
  const { module } = useParams()
  const [files] = useAtom(filesState)
  const file = files.find((item) => item.id === entry.fileId)
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const SIZE = 50

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: loading,
  } = useInfiniteQuery({
    queryKey: ['worktop:entry:comment', module, file?.id, language, entry?.id],
    queryFn: ({ pageParam = 1 }) =>
      listRest({
        entryId: entry.id,
        language,
        page: pageParam,
        size: SIZE,
        module: module as string,
        fileId: file?.id,
      }),
    getNextPageParam: (lastPage, pages) =>
      (lastPage?.total || 0) > pages.length * SIZE ? pages.length + 1 : undefined,
    enabled: !!entry?.id && !!file?.id,
    initialPageParam: 1,
  })

  const list = useMemo(() => data?.pages.flatMap((page) => page?.data || []) || [], [data])

  // 刷新事件
  useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries({ queryKey: ['worktop:entry:comment', module, file?.id, language, entry?.id] })
    }
    bus.on(ENTRY_COMMENT_RELOAD, handler)
    return () => {
      bus.off(ENTRY_COMMENT_RELOAD, handler)
    }
  }, [queryClient, module, file?.id, language, entry?.id])

  return (
    <div className="h-0 w-full flex-1 flex-shrink-0">
      <ScrollArea className="h-full w-full">
        <div className="space-y-3 pb-2">
          {list.map((item) => (
            <CommentListItem key={item.id} item={item} />
          ))}
          {loading ? <CommentListLoading /> : null}
          {!loading && list.length === 0 ? <Empty text={t('暂无评论')} /> : null}
          {!loading && hasNextPage && (
            <div className="flex w-full justify-center">
              <Button onClick={() => fetchNextPage()} variant="link">
                {t('加载更多')}
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
