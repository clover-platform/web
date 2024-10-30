import {localeState} from "@clover/public/state/public";
import { useRecoilValue } from "recoil";

export const useLocale = () => {
    return useRecoilValue(localeState);
}
