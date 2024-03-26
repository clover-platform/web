import {useEffect, useMemo, useRef, useState} from "react";
import {languages} from "@/rest/module";
import { useRouter, useSearchParams } from "next/navigation";
import {all} from "@/rest/module.branch";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    branchesState,
    currentBranchState, currentEntryState,
    currentLanguageState,
    entriesLoadingState,
    entriesState,
    languagesState,
} from "@/state/worktop";
import { detail, list } from "@/rest/entry";

export const useWorktopState = () => {
    const search = useSearchParams();
    const setCurrentEntry = useSetRecoilState(currentEntryState);
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
        setCurrentEntry(0);
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
    const search = useSearchParams();
    const id = search.get("id");
    const [loading, setLoading] = useRecoilState(entriesLoadingState);
    const [entries, setEntries] = useRecoilState(entriesState);
    const paramsRef = useRef(defaultEntriesParams);
    const [total, setTotal] = useState(0);
    const pages = useMemo(() => Math.ceil(total / paramsRef.current.size), [total]);
    const currentBranch = useRecoilValue(currentBranchState);
    const branchRef = useRef<number>();
    const branches = useRecoilValue(branchesState);
    const currentLanguage = useRecoilValue(currentLanguageState);

    const load = async (_params?: any) => {
        setLoading(true)
        const params = {
            ...paramsRef.current,
            ...(_params || {}),
            branchId: branchRef.current,
            moduleId: Number(id),
            language: currentLanguage
        }
        paramsRef.current = params;
        const { success, data } = await list(params);
        setLoading(false)
        if(success) {
            setTotal(data.total);
            setEntries(data.data)
        }
    }

    useEffect(() => {
        const branch = branches.find(b => b.name === currentBranch);
        branchRef.current = branch?.id;
        load().then();
    }, [currentBranch, currentLanguage]);

    return {
        load,
        loading,
        entries,
        total,
        pages
    }
}

export const useEntriesUpdater = () => {
    const [entries, setEntries] = useRecoilState(entriesState);
    const currentLanguage = useRecoilValue(currentLanguageState);

    const update = async (id: number) => {
        const result = await detail({
            id,
            language: currentLanguage
        });
        if(result.success) {
            setEntries(entries.map(entry => entry.id === id ? result.data! : entry));
        }
    }

    const remove = async (id: number) => {
        setEntries(entries.filter(entry => entry.id !== id));
    }

    return {
        update,
        entries,
        remove,
    }
}
