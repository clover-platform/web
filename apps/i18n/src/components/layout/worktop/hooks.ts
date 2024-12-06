import {useEffect, useMemo, useRef, useState} from "react";
import {languages} from "@/rest/module";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {all} from "@/rest/branch";
import {useAtom} from "jotai";
import {
    branchesState, countState,
    currentBranchState, currentEntryState,
    currentLanguageState, currentPageState,
    entriesLoadingState,
    entriesState,
    languagesState,
} from "@/state/worktop";
import { count, detail, all as allEntry } from "@/rest/entry";
import {SIZE} from "@/components/pages/worktop/main/panel/entry";

export const useWorktopState = () => {
    const search = useSearchParams();
    const [_ce, setCurrentEntry] = useAtom(currentEntryState);
    const branch = search.get("branch") || '';
    const target = search.get("target") || '';
    const [loading, setLoading] = useState(true);
    const { module } = useParams();
    const [_l, setLanguages] = useAtom(languagesState);
    const [_b, setBranches] = useAtom(branchesState);
    const [_cl, setCurrentLanguage] = useAtom(currentLanguageState);
    const [_cb, setCurrentBranch] = useAtom(currentBranchState);

    const load = async () => {
        setLoading(true);
        const languagesResult = await languages(module as string);
        const branchesResult = await all(module as string);
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
    const [currentLanguage] = useAtom(currentLanguageState);
    const [currentBranch] = useAtom(currentBranchState);
    const query = [`target=${currentLanguage}`, `branch=${currentBranch}`].join('&');
    useEffect(() => {
        router.replace(`?${query}`);
    }, [currentLanguage, currentBranch]);
}

export const useEntriesLoader = () => {
    const { module } = useParams();
    const [originEntries, setOriginEntries] = useState([]);
    const [loading, setLoading] = useAtom(entriesLoadingState);
    const [entries, setEntries] = useAtom(entriesState);
    const [currentBranch] = useAtom(currentBranchState);
    const [branches] = useAtom(branchesState);
    const [currentLanguage] = useAtom(currentLanguageState);
    const [_c, setCount] = useAtom(countState);
    const branch = branches.find(b => b.name === currentBranch);
    const [page, setPage] = useAtom(currentPageState);
    const [current, setCurrent] = useAtom(currentEntryState);
    const [keyword, setKeyword] = useState<string>('');
    const paramsRef = useRef({});

    const filteredEntries = useMemo(() => {
        return originEntries?.filter(entry => entry.value.includes(keyword)) || [];
    }, [originEntries, keyword]);

    const pages = useMemo(() => {
        return Math.ceil((filteredEntries?.length || 0) / SIZE);
    }, [filteredEntries]);

    const pageEntries = useMemo(() => {
        const startIndex = (page - 1) * SIZE; // 计算起始索引
        return filteredEntries.slice(startIndex, startIndex + SIZE); // 使用 slice 获取分页数据
    }, [filteredEntries, page]);

    useEffect(() => {
        setEntries(pageEntries);
    }, [pageEntries]);

    const load = async () => {
        setLoading(true)
        const params = {
            ...paramsRef.current,
            branch: branch?.name,
            module: module as string,
            language: currentLanguage
        }
        paramsRef.current = params;
        const { success, data } = await allEntry(params);
        if(success) {
            setOriginEntries(data.data)
        }
        setLoading(false)
    }

    const loadCount = async () => {
        const countResult = await count({
            module: module as string,
            language: currentLanguage,
            branch: currentBranch
        });
        if(countResult.success) setCount(countResult.data!);
    }

    useEffect(() => {
        currentLanguage && load().then();
        currentLanguage && loadCount().then();
    }, [currentBranch, currentLanguage]);

    return {
        load,
        loading,
        entries,
        setPage,
        setCurrent,
        setKeyword,
        pages,
        page,
        current,
        keyword
    }
}

export const useEntriesUpdater = () => {
    const { module } = useParams();
    const [entries, setEntries] = useAtom(entriesState);
    const [currentLanguage] = useAtom(currentLanguageState);
    const [currentBranch] = useAtom(currentBranchState);
    const [_c, setCount] = useAtom(countState);
    const [branches] = useAtom(branchesState);

    const update = async (id: number) => {
        const entry = entries.find(e => e.id === id);
        const branch = branches.find(b => b.id === entry?.branchId);
        const result = await detail({
            id,
            language: currentLanguage,
            module: module as string,
            branch: branch?.name!
        });
        if(result.success) {
            setEntries(entries.map(entry => entry.id === id ? result.data! : entry));
            loadCount().then();
        }
    }

    const remove = async (id: number) => {
        setEntries(entries.filter(entry => entry.id !== id));
        loadCount().then();
    }

    const loadCount = async () => {
        const countResult = await count({
            module: module as string,
            language: currentLanguage,
            branch: currentBranch
        });
        if(countResult.success) setCount(countResult.data!);
    }

    return {
        update,
        entries,
        remove,
    }
}
