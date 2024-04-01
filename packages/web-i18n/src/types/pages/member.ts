import { User } from "@clover/public/rest/account";

export type Member = {
    id: number;
    type: number;
    joinTime: Date;
    user: User;
}
