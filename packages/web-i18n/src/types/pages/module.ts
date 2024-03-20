import { User } from "@clover/public/rest/account";

export type ModuleDetail = {
    id?: number;
    source?: string;
    memberSize?: number;
    wordSize?: number;
    createTime?: string;
    updateTime?: string;
}

export type Member = User & {
    type: number;
}
