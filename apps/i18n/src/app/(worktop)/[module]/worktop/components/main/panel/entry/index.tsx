import { useEntriesLoader } from '@/components/layout/worktop/hooks'
import { ENTRY_RELOAD } from '@/events/worktop'
import bus from '@clover/public/events'
import { Empty, Input, ScrollArea } from '@easykit/design'
import { CheckIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageCheck } from '../../check/language'
import { CreateEntryButton } from './create/button'
import { EntryLoading } from './loading'
import { Pagination } from './pagination'

export const SIZE = 50

export const EntryPanel = () => {
  const { entries, loading, load, setKeyword, setCurrent, setPage, keyword, pages, page, current } = useEntriesLoader()
  const { t } = useTranslation()

  useEffect(() => {
    const handler = () => {
      setCurrent(0)
      setPage(1)
      load().then()
    }
    bus.on(ENTRY_RELOAD, handler)
    return () => {
      bus.off(ENTRY_RELOAD, handler)
    }
  }, [load, setCurrent, setPage])

  const changePage = (page: number) => {
    setPage(page)
    setCurrent(0)
  }

  const iconCheck = <CheckIcon className="text-green-500 text-sm" />
  const iconNormal = <div className="h-2.5 w-2.5 rounded-[2px] bg-red-300" />
  const iconTranslated = <div className="h-2.5 w-2.5 rounded-[2px] bg-primary opacity-90" />

  return (
    <LanguageCheck>
      <div className="flex h-full w-full flex-col items-center justify-center bg-muted">
        <div className="flex w-full items-center justify-center space-x-2 p-2">
          <Input
            value={keyword}
            onChange={(e) => {
              setPage(1)
              setCurrent(0)
              setKeyword(e.target.value)
            }}
            className="flex-1"
            placeholder={t('搜索词条')}
          />
          <CreateEntryButton />
        </div>
        <div className="relative h-0 w-full flex-1 flex-shrink-0">
          <ScrollArea className="h-full w-full p-2 pt-0">
            {loading ? (
              <EntryLoading />
            ) : entries.length ? (
              entries.map((entry, index) => {
                const { verified, translated } = entry
                return (
                  <div
                    key={entry.id}
                    className={classNames(
                      'm-1 flex cursor-pointer items-center justify-center rounded-sm px-2 py-1',
                      'action-effect action-effect-active',
                      current === index ? 'action-active' : 'bg-transparent text-muted-foreground'
                    )}
                    onClick={() => setCurrent(index)}
                  >
                    <div className="flex h-6 w-6 items-center justify-center">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-black/30">
                        {translated ? (verified ? iconCheck : iconTranslated) : iconNormal}
                      </div>
                    </div>
                    <div className="w-0 flex-1 flex-shrink-0 truncate pl-1 text-foreground text-sm">{entry.value}</div>
                  </div>
                )
              })
            ) : (
              <Empty text={t('暂无词条')} />
            )}
          </ScrollArea>
          <div className="absolute right-2 bottom-2">
            <Pagination page={page} pages={pages} onChange={changePage} />
          </div>
        </div>
      </div>
    </LanguageCheck>
  )
}
