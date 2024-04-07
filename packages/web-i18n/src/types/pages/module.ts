import { User } from "@clover/public/types/account";

export type Module = {
    id: number;
    name: string;
    owner: number;
    projectId: number;
    createTime: string;
    updateTime?: string;
    description?: string;
    identifier?: string;
    memberSize?: number;
    targetSize?: number;
    source: string;
    sourceSize?: number;
}

export type ModuleDetail = {
    id?: number;
    source?: string;
    memberSize?: number;
    wordSize?: number;
    createTime?: string;
    updateTime?: string;
}

export type Member = {
    id: number;
    roles: number[];
    user: User
}

export type Language = {
    name: string;
    code: string;
    id: number;
}

export type Branch = {
    name: string;
    id: number;
}

export type InviteDetail = {
    identifier: string;
    name: string;
    description?: string;
    source: string;
    roles: string[];
    targets: Language[];
}
