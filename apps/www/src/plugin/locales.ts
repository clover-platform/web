import enUSPublic from '@clover/public/assets/locales/en-US.json'
import zhCNPublic from '@clover/public/assets/locales/zh-CN.json'
import zhTWPublic from '@clover/public/assets/locales/zh-TW.json'
import { initI18next } from '@clover/public/utils/i18next'
import enUS from '@/assets/locales/en-US.json'
import zhCN from '@/assets/locales/zh-CN.json'
import zhTW from '@/assets/locales/zh-TW.json'

initI18next({
  'zh-CN': {
    ...zhCNPublic,
    ...zhCN,
  },
  'zh-TW': {
    ...zhTWPublic,
    ...zhTW,
  },
  'en-US': {
    ...enUSPublic,
    ...enUS,
  },
})
