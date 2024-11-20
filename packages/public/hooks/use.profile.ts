import {accountInfoState} from "@clover/public/state/account";
import {useAtom} from "jotai";

export const useProfile = () => {
    const [profile] = useAtom(accountInfoState);
    return profile;
}
