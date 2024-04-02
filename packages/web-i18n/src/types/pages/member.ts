import { User } from "@clover/public/rest/account";

export type Member = {
    id: number;
    type: number;
    joinTime: Date;
    user: User;
}

export type MemberInvite = {
    id: number;
    moduleId: number;
    roles: string[];
    createTime: Date;
    token: string;
    creatorId: number;
}

export type MemberInviteRequest = {
    roles: string[];
    emails: string;
    content: string;
}
