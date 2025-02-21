import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import {FALLBACK} from "@clover/public/config/locale";
import langList from "@clover/public/config/lang.list";

export const getLocale = async (): Promise<string> => {
  const locale = await getCookie('locale', {cookies});
  if (langList.some((lang) => lang.locale === locale)) {
    return locale as string;
  }
  return FALLBACK;
}
