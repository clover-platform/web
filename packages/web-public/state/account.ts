import {atom} from "recoil";
import {Account} from "@clover/public/types/account";
import { create } from "zustand";

type AccountState = {
    isLogin: boolean;
    setLogin: (isLogin: boolean) => void;
    accountInfo: Account;
    load: () => Promise<void>;
}
export const useAccountState = create<AccountState>((set) => ({
    isLogin: false,
    setLogin: (isLogin: boolean) => set({ isLogin }),
    accountInfo: {
        id: 0,
        username: '',
        authorities: [],
        otpStatus: 0,
        currentProjectId: 0,
        currentTeamId: 0,
    },
    load: async () => {
        set({ isLogin: true });

    }
}))

export const isLoginState = atom({
    key: 'account/isLogin',
    default: false
})

export const accountInfoState = atom<Account>({
    key: 'account/info',
    default: {
        id: 0,
        username: '',
        authorities: [],
        otpStatus: 0,
        currentProjectId: 0,
        currentTeamId: 0,
    }
})
