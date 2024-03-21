import {useEffect, useState} from "react";
import {languages} from "@/rest/module";
import {useSearchParams} from "next/navigation";
import {all} from "@/rest/module.branch";
import {useSetRecoilState} from "recoil";
import {branchesState, languagesState} from "@/state/worktop";

export const useWorktopState = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const [loading, setLoading] = useState(true);
    const setLanguages = useSetRecoilState(languagesState);
    const setBranches = useSetRecoilState(branchesState);

    const load = async () => {
        setLoading(true);
        const languagesResult = await languages(Number(id));
        const branchesResult = await all(Number(id));
        setLoading(false);
        if(languagesResult.success) setLanguages(languagesResult.data || []);
        if(branchesResult.success) setBranches(branchesResult.data || []);
    }

    useEffect(() => {
        load().then();
    }, []);

    return loading;
}
