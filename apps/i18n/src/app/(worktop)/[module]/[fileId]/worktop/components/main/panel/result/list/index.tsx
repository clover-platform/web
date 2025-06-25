import { ENTRY_RESULT_RELOAD } from '@/events/worktop'
import { useCurrentFile } from '@/hooks/use.current.file'
import { list as listRest } from '@/rest/entry.result'
import { currentEntryState, currentLanguageState, entriesState } from '@/state/worktop'
import bus from '@clover/public/events'
import { Button, Empty, ScrollArea } from '@easykit/design'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ResultItem } from './item'
import { ResultListLoading } from './loading'

const SIZE = 5

export const ResultList = () => {
  const [language] = useAtom(currentLanguageState)
  const [entries] = useAtom(entriesState)
  const [current] = useAtom(currentEntryState)
  const entry = entries[current]
  const { t } = useTranslation()

  const { module } = useParams()
  const file = useCurrentFile()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: loading,
  } = useInfiniteQuery({
    queryKey: ['worktop:entry:result', module, file?.id, language, entry?.id],
    queryFn: ({ pageParam = 1 }) =>
      listRest({
        module: module as string,
        entryId: entry?.id,
        language,
        page: pageParam,
        size: SIZE,
        fileId: file?.id,
      }),
    getNextPageParam: (lastPage, pages) =>
      (lastPage?.total || 0) > pages.length * SIZE ? pages.length + 1 : undefined,
    enabled: !!entry?.id && !!file?.id,
    initialPageParam: 1,
  })

  const list = useMemo(() => data?.pages.flatMap((page) => page?.data || []) || [], [data])

  useEffect(() => {
    const handler = () => {
      fetchNextPage()
    }
    bus.on(ENTRY_RESULT_RELOAD, handler)
    return () => {
      bus.off(ENTRY_RESULT_RELOAD, handler)
    }
  }, [fetchNextPage])

  return (
    <div className="h-0 w-full flex-1 flex-shrink-0">
      <ScrollArea className="h-full w-full">
        {!loading && list.length === 0 ? <Empty text={t('暂无翻译')} /> : null}
        <div className="space-y-2 p-2">
          {list.map((item) => {
            return <ResultItem key={item.id} item={item} />
          })}
          {loading && <ResultListLoading />}
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
