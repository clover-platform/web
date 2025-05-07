import {localeState} from "@clover/public/state/public";
import {useAtom} from "jotai";

export const useLocale = () => {
  return useAtom(localeState);
}
