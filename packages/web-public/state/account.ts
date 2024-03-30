import {atom} from "recoil";
import {Account} from "@clover/public/types/account";

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
        projectId: 0,
        teamId: 0,
    }
})
