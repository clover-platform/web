import {get} from "@easy-kit/common/utils/rest";
import {RestResult} from "@easy-kit/common/types/rest";

export type User = {
    id: number;
    email: string;
    username: string;
    avatar: string;
}

export type UsersResult = RestResult<User[]>


export const users = async (ids: number[]): Promise<UsersResult> =>
    get(`@main/account/info/`, { ids: ids.join(",")});
