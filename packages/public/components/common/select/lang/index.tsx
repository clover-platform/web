import langList from '@clover/public/config/lang.list'
import { useLocale } from '@clover/public/hooks'
import { Select, type SelectOptionProps } from '@easykit/design'
import classNames from "classnames";

import type { FC } from 'react'

const options: SelectOptionProps[] = langList.map((lang) => ({
  value: lang.locale,
  label: lang.name,
}));

export type LangSelectProps = {
  className?: string
}

export const LangSelect: FC<LangSelectProps> = (props) => {
  const {className} = props;
  const [locale, setLocale] = useLocale();

  return (
    <Select
      value={locale}
      options={options}
      className="h-8 w-auto"
      triggerClassName={classNames('px-2 py-1', className)}
      align="end"
      onChange={(value) => {
        if (locale !== value) {
          setLocale(value)
        }
      }}
    />
  )
}
