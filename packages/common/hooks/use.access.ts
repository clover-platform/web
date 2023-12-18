import {useRecoilValue} from "@easy-kit/common/state";
import {accessState} from "@easy-kit/common/state/access";

export type AccessChecker = (v: string|string[]|undefined, every?: boolean) => boolean;

export const useAccess = (): AccessChecker => {
    const permissions = useRecoilValue(accessState);
    return (v: string|string[]|undefined, every = true) => {
        // return true;
        let hasPermissions = false;
        // if(!v) return hasPermissions;
        // 为了兼容新需求，权限未定的情况
        if(!v) return true;
        if(typeof v === 'string') {
            hasPermissions = permissions?.includes(v);
        } else {
            v = v || [];
            const executor = every ? 'every' : 'some';
            hasPermissions = v[executor]((e:string)=> permissions?.includes(e));
        }
        return hasPermissions;
    }
}
