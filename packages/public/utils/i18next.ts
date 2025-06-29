import enUSEditor from '@easykit/editor/locales/en-us'
import zhCNEditor from '@easykit/editor/locales/zh-cn'
import zhTWEditor from '@easykit/editor/locales/zh-tw'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ReactPostprocessor from 'i18next-react-postprocessor'
import { setErrorMap } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import enUSZod from 'zod-i18n-map/locales/en/zod.json'
import zhCNZod from 'zod-i18n-map/locales/zh-CN/zod.json'
import zhTWZod from 'zod-i18n-map/locales/zh-TW/zod.json'

const languageDetector = new LanguageDetector()

export type LangItem = {
  name: string
  locale: string
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const initI18next = (map: Record<string, any>) => {
  i18next
    .use(new ReactPostprocessor())
    .use(languageDetector)
    .init({
      ns: ['zod', 'translation'],
      postProcess: ['reactPostprocessor'],
      resources: {
        'zh-CN': {
          zod: zhCNZod,
          translation: map['zh-CN'],
          editor: zhCNEditor,
        },
        'zh-TW': {
          zod: zhTWZod,
          translation: map['zh-TW'],
          editor: zhTWEditor,
        },
        'en-US': {
          zod: enUSZod,
          translation: map['en-US'],
          editor: enUSEditor,
        },
      },
      interpolation: {
        escapeValue: false,
      },
      detection: {
        caches: ['localStorage', 'cookieCrossDomain'],
        order: [
          'cookieCrossDomain',
          'querystring',
          'localStorage',
          'sessionStorage',
          'navigator',
          'htmlTag',
          'path',
          'subdomain',
        ],
      },
    })
    .then()
  setErrorMap(zodI18nMap)
}