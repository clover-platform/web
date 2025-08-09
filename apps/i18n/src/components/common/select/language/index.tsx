import type { FC } from 'react'
import { ComboSelect, type ComboSelectProps, cn } from '@easykit/design'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { languagesState } from '@/state/public'
export type LanguageSelectProps = {
  className?: string
} & ComboSelectProps

export const LanguageSelect: FC<LanguageSelectProps> = ({ ...props }) => {
  const { className, ...rest } = props
  const [languages] = useAtom(languagesState)
  const { t } = useTranslation()

  const options = languages.map((lang) => {
    return {
      label: lang.name,
      value: lang.code,
      aw: lang,
    }
  })

  return (
    <ComboSelect
      {...rest}
      className={cn('h-auto max-h-[150px] w-full overflow-auto', className)}
      clearText={t('清空选择')}
      filter={(_value: string, search: string, item) => {
        const label = item?.label?.toString() || ''
        const v = item?.value || ''
        return label.toLowerCase().includes(search.toLowerCase()) || v.toLowerCase().includes(search.toLowerCase())
      }}
      options={options}
      search={true}
      searchPlaceholder={t('关键词')}
    />
  )
}
