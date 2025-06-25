import { ENTRY_RESULT_RELOAD } from '@/events/worktop'
import { useCurrentBranch } from '@/hooks/use.current.branch'
import { list as listRest } from '@/rest/entry.result'
import { currentEntryState, currentLanguageState, entriesState } from '@/state/worktop'
import type { EntryResult } from '@/types/module/entry'
import bus from '@clover/public/events'
import { Button, Empty, ScrollArea } from '@easykit/design'
import { compact, uniq } from 'es-toolkit'
import { useAtom } from 'jotai'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ResultItem } from './item'
import { ResultListLoading } from './loading'

export const ResultList = () => {
  const [language] = useAtom(currentLanguageState)
  const [entries] = useAtom(entriesState)
  const [current] = useAtom(currentEntryState)
  const entry = entries[current]
  const { t } = useTranslation()

  const pageRef = useRef(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<EntryResult[]>([])
  const [loading, setLoading] = useState(false)
  const { module } = useParams()
  const branch = useCurrentBranch()

  const load = useCallback(
    async (options?: { append?: boolean }) => {
      const { append = false } = options || {}
      if (!append) setList([])
      setLoading(true)
      const { success, data } = await listRest({
        module: module as string,
        entryId: entry?.id,
        language,
        page: pageRef.current,
        size: 5,
        branch: branch?.name || '',
      })
      if (success) {
        const { total, data: newList } = data!
        const translatorIds = newList.map((item) => item.translatorId)
        const verifierIds = newList.map((item) => item.checkerId)
        const ids = uniq(compact([...translatorIds, ...verifierIds]))
        console.log(ids)
        setList([...(append ? list : []), ...newList])
        setTotal(total)
      }
      setLoading(false)
    },
    [entry, language, module, branch, list]
  )

  const loadMore = () => {
    pageRef.current += 1
    load({ append: true }).then()
  }

  useEffect(() => {
    pageRef.current = 1
    load().then()
  }, [load])

  useEffect(() => {
    const handler = () => {
      pageRef.current = 1
      load().then()
    }
    bus.on(ENTRY_RESULT_RELOAD, handler)
    return () => {
      bus.off(ENTRY_RESULT_RELOAD, handler)
    }
  }, [load])

  return (
    <div className="h-0 w-full flex-1 flex-shrink-0">
      <ScrollArea className="h-full w-full">
        {!loading && list.length === 0 ? <Empty text={t('暂无翻译')} /> : null}
        <div className="space-y-2 p-2">
          {list.map((item) => {
            return <ResultItem key={item.id} item={item} />
          })}
          {loading ? <ResultListLoading /> : null}
          {!loading && total > list.length ? (
            <div className="flex w-full justify-center">
              <Button onClick={loadMore} variant="link">
                {t('加载更多')}
              </Button>
            </div>
          ) : null}
        </div>
      </ScrollArea>
    </div>
  )
}
