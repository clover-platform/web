import {localeState} from "@clover/public/state/public";
import i18next from 'i18next'
import {useAtom} from "jotai";

export const useLocale = (): [string, (value: string) => void] => {
  const [locale, setLocale] = useAtom(localeState)
  return [
    locale,
    (value: string) => {
      setLocale(value)
      i18next?.changeLanguage(value)
    },
  ]
}
