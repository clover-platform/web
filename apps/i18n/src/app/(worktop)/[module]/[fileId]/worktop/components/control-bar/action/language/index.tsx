import type { FC } from 'react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Action } from '@clover/public/components/common/action'
import { currentLanguageState, languagesState } from '@/state/worktop'

export type LanguageActionProps = {
  onClick: () => void
}

export const LanguageAction: FC<LanguageActionProps> = (props) => {
  const { t } = useTranslation()
  const [languages] = useAtom(languagesState)
  const [current] = useAtom(currentLanguageState)
  const language = languages.find((item) => item.code === current)

  return (
    <Action className="!px-1.5 h-8" onClick={props.onClick}>
      {language ? language.name : t('请选择语言')}
    </Action>
  )
}
