import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { languagesLoadingState, languagesState } from "@/state/public";
import { languages } from "@/rest/common";

export const useLanguagesInit = () => {
    const setValue = useSetRecoilState(languagesState);
    const setLoading = useSetRecoilState(languagesLoadingState);
    const load = async () => {
        setLoading(true);
        const { success, data } = await languages();
        setLoading(false);
        if(success) {
            setValue(data || [])
        }
    }

    useEffect(() => {
        load().then();
    }, []);
}
