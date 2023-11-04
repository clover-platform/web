import {atom} from "recoil";

export const isLoginState = atom({
    key: 'account/isLogin',
    default: false
})

export const accountInfoState = atom({
    key: 'account/info',
    default: {}
})
