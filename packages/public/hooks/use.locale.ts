import {localeState} from "@clover/public/state/public";
import {useAtom} from "jotai";

export const useLocale = () => {
  const [locale] = useAtom(localeState);
  return locale;
}
