import {localeState} from "@clover/public/state/public";
import { useRecoilValue } from "recoil";
import { useMemo } from "react";
import { getLocale } from "@easykit/common/utils/locale";

export const useLocale = () => {
    const code = useRecoilValue(localeState);

    return useMemo(() => {
        return getLocale(code);
    }, [code])
}
