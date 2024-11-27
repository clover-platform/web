import {AbortPromise, get} from "@easykit/common/utils/rest";
import {PageResult} from "@easykit/common/types/rest";
import {AccessToken} from "@/types/profile/access/token";

export const list = (): AbortPromise<PageResult<AccessToken>> =>
    get(`@main/account/access/token/list`);
