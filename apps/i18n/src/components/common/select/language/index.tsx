import { languagesState } from "@/state/public";
import { ComboSelect, type ComboSelectProps, cn } from '@easykit/design'
import { useAtom } from 'jotai'
import type { FC } from 'react'
import { useTranslation } from "react-i18next";
export type LanguageSelectProps = {
  className?: string;
} & ComboSelectProps;

export const LanguageSelect: FC<LanguageSelectProps> = ({ ref, ...props }) => {
  const { className, ...rest } = props;
  const [languages] = useAtom(languagesState);
  const { t } = useTranslation();

  const options = languages.map((lang) => {
    return {
      label: lang.name,
      value: lang.code,
      aw: lang,
    }
  });

  return (
    <ComboSelect
      {...rest}
      search={true}
      ref={ref}
      className={cn('max-h-[150px] w-full overflow-auto', className)}
      searchPlaceholder={t('关键词')}
      options={options}
      clearText={t('清空选择')}
      filter={(value: string, search: string) => {
        const item = options.find((o) => o.value.toLowerCase() === value.toLowerCase())
        const label = item?.label?.toString()
        const v = item?.value
        return label?.toLowerCase().includes(search.toLowerCase()) || v?.toLowerCase().includes(search.toLowerCase())
          ? 1
          : 0
      }}
    />
  )
}
