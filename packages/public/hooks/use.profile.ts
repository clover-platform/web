import {accountInfoState} from "@clover/public/state/account";
import {useAtom} from "jotai";

export const useProfile = () => {
    return useAtom(accountInfoState);
}
