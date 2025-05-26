import { isMobile } from '@clover/public/utils'
import {getToken} from "@clover/public/utils/token";
import Bowser from 'bowser'
import i18next from "i18next";

export const get = async () => {
  const browser = Bowser.parse(window.navigator.userAgent)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const headers: any = {
    'Accept-Language': i18next.language,
    'CLIENT-PLATFORM-TYPE': isMobile() ? 'H5' : 'PC',
    'CLIENT-BUNDLE-ID': location.hostname,
    'CLIENT-DEVICE-MODEL': browser.os.name,
    'CLIENT-SYSTEM-VERSION': browser.os.version,
    'CLIENT-TIMESTAMP': Date.now(),
  }
  const token = await getToken()
  if (token) headers.Authorization = `Bearer ${token.token}`
  return headers
}
