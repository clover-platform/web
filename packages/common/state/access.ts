import {atom} from "@easy-kit/common/state";

// 由业务方提供权限值

export const accessState = atom<string[]>({
    key: 'sdk.access',
    default: []
})
