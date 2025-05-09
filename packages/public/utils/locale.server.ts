import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import {FALLBACK} from "@clover/public/config/locale";
import langList from "@clover/public/config/lang.list";
import i18next from "i18next";

export const getLocale = async (): Promise<string> => {
  const locale = await getCookie('i18next', {cookies});
  if (langList.some((lang) => lang.locale === locale)) {
    return locale as string;
  }
  return FALLBACK;
}

export const st = async (key: string, vars?: Record<string, string>) => {
  return i18next?.t(key, {
    lng: await getLocale(),
    ns: "translation", ...(vars || {})}
  );
}