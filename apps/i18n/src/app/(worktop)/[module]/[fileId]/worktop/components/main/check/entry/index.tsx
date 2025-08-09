import { type FC, type PropsWithChildren, useMemo } from 'react'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { currentEntryState, entriesState } from '@/state/worktop'
export type ResultCheckProps = PropsWithChildren<{
  className?: string
}>

export const EntryCheck: FC<ResultCheckProps> = (props) => {
  const { t } = useTranslation()
  const [currentIndex] = useAtom(currentEntryState)
  const [entries] = useAtom(entriesState)
  const current = useMemo(() => {
    if (entries?.length) {
      return entries[currentIndex]
    }
    return null
  }, [currentIndex, entries])

  return current ? (
    props.children
  ) : (
    <div
      className={classNames(
        'flex h-full w-full items-center justify-center text-md text-muted-foreground',
        props.className
      )}
    >
      {t('请选择词条')}
    </div>
  )
}
