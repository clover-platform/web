import { Member } from "@/types/pages/module";
import { User } from "@clover/public/rest/account";

export type Entry = {
    id: number;
    key: string;
    value: string;
    moduleId: number;
    branchId: number;
    verified: boolean;
    translated: boolean;
    translation?: EntryResult;
}

export type EntryResult = {
    id: number;
    entryId: number;
    content: string;
    language: string;
    createTime: Date;
    translatorId: number;
    checkerId: number;
    updateTime: Date;
    verified: boolean;
    translator?: User;
    verifier?: User;
    verifiedTime?: Date;
}

export type EntryResultPage = {
    total: number;
    data: EntryResult[];
}
