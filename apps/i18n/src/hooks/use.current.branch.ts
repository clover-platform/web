import {useAtom} from "jotai/index";
import {branchesState, currentEntryState, entriesState} from "@/state/worktop";
import {useMemo} from "react";

export const useCurrentBranch = () => {
    const [entries] = useAtom(entriesState);
    const [current] = useAtom(currentEntryState);
    const entry = entries[current];
    const [branches] = useAtom(branchesState);
    return useMemo(() => branches.find((i) => i.id === entry.branchId), [branches, entry]);
}
