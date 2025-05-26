import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector';
import ReactPostprocessor from 'i18next-react-postprocessor'
import { setErrorMap } from 'zod'
import { zodI18nMap } from "zod-i18n-map";
import enUSZod from 'zod-i18n-map/locales/en/zod.json'
import zhCNZod from "zod-i18n-map/locales/zh-CN/zod.json";
import zhTWZod from 'zod-i18n-map/locales/zh-TW/zod.json'

export type LangItem = {
  name: string
  locale: string
} 

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const initI18next = (map: Record<string, any>) => {
  i18next
    .use(new ReactPostprocessor())
    .use(LanguageDetector)
    .init({
      ns: ['zod', 'translation'],
      postProcess: ['reactPostprocessor'],
      resources: {
        'zh-CN': {
          zod: zhCNZod,
          translation: map['zh-CN'],
        },
        'zh-TW': {
          zod: zhTWZod,
          translation: map['zh-TW'],
        },
        'en-US': {
          zod: enUSZod,
          translation: map['en-US'],
        },
      },
      interpolation: {
        escapeValue: false,
      },
      detection: {
        caches: ['localStorage', 'cookie'],
        order: ['cookie', 'querystring', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      },
    })
    .then()
  setErrorMap(zodI18nMap)
}