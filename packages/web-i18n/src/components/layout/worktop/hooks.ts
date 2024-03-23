import {useEffect, useRef, useState} from "react";
import {languages} from "@/rest/module";
import { useRouter, useSearchParams } from "next/navigation";
import {all} from "@/rest/module.branch";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    branchesState,
    currentBranchState,
    currentLanguageState,
    entriesLoadingState,
    entriesState,
    languagesState
} from "@/state/worktop";
import {list} from "@/rest/entry";

export const useWorktopState = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const branch = search.get("branch") || '';
    const target = search.get("target") || '';
    const [loading, setLoading] = useState(true);
    const setLanguages = useSetRecoilState(languagesState);
    const setBranches = useSetRecoilState(branchesState);
    const setCurrentLanguage = useSetRecoilState(currentLanguageState);
    const setCurrentBranch = useSetRecoilState(currentBranchState);

    const load = async () => {
        setLoading(true);
        const languagesResult = await languages(Number(id));
        const branchesResult = await all(Number(id));
        setLoading(false);
        if(languagesResult.success) setLanguages(languagesResult.data || []);
        if(branchesResult.success) setBranches(branchesResult.data || []);
        setCurrentBranch(branch);
        setCurrentLanguage(target);
    }

    useEffect(() => {
        load().then();
    }, []);

    return loading;
}

export const useQuerySync = () => {
    const router = useRouter();
    const search = useSearchParams();
    const id = search.get("id");
    const currentLanguage = useRecoilValue(currentLanguageState);
    const currentBranch = useRecoilValue(currentBranchState);
    const query = [`id=${id}`, `target=${currentLanguage}`, `branch=${currentBranch}`].join('&');
    useEffect(() => {
        router.replace(`?${query}`);
    }, [id, currentLanguage, currentBranch]);
}

export const defaultEntriesParams = {
    page: 1, size: 50
};

export const useEntriesLoader = () => {
    const [loading, setLoading] = useRecoilState(entriesLoadingState);
    const [entries, setEntries] = useRecoilState(entriesState);
    const paramsRef = useRef(defaultEntriesParams);

    const load = async (params?: any) => {
        setLoading(true)
        const { success, data } = await list({
            ...paramsRef.current,
            ...(params || {})
        });
        setLoading(false)
        if(success) {
            setEntries(data.data)
        }
    }

    return {
        load,
        loading,
        entries
    }
}
