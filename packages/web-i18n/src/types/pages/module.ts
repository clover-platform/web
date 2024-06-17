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
    wordSize?: number;
}

export type ModuleCount = {
    wordCount: number;
    branchCount: number;
    memberCount: number;
    targetCount: number;
}

export type ModuleDetail = {
    id?: number;
    source?: string;
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

export type BaseInfo = {
    id?: number;
    name?: string;
    description?: string;
}

export type UpdateInfo = {
    id?: number;
    name?: string;
    description?: string;
}
