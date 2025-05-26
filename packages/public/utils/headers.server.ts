import {getToken} from "@clover/public/utils/token";
import i18next from "i18next";
import { cookies } from 'next/headers'

export const get = async () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const headers: any = {
    'Accept-Language': i18next.language,
    'CLIENT-PLATFORM-TYPE': 'SSR',
    'CLIENT-BUNDLE-ID': '',
    'CLIENT-DEVICE-MODEL': '',
    'CLIENT-SYSTEM-VERSION': '',
    'CLIENT-TIMESTAMP': Date.now(),
  }
  const token = await getToken(cookies);
  if (token) headers.Authorization = `Bearer ${token.token}`
  return headers;
}
