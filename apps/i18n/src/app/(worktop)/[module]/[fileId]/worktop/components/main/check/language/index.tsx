import type { FC, PropsWithChildren } from 'react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { currentLanguageState } from '@/state/worktop'

export type LanguageCheckProps = PropsWithChildren

export const LanguageCheck: FC<LanguageCheckProps> = (props) => {
  const { t } = useTranslation()
  const [current] = useAtom(currentLanguageState)
  return current ? (
    props.children
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-muted text-md text-muted-foreground">
      {t('请选择语言')}
    </div>
  )
}
