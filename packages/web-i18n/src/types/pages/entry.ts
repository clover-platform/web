import { Member } from "@/types/pages/module";

export type Entry = {
    id: number;
    key: string;
    value: string;
    moduleId: number;
    branchId: number;
    verified: boolean;
    translated: boolean;
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
    translator?: Member;
    verifier?: Member;
}

export type EntryResultPage = {
    total: number;
    data: EntryResult[];
}
