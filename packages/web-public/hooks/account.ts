import {accountInfoState} from "@clover/public/state/account";
import {useRecoilValue} from "recoil";

export const useProfile = () => {
    return useRecoilValue(accountInfoState);
}
