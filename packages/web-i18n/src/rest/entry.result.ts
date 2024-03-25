import { RestResult } from "@easy-kit/common/types/rest";
import { post, get } from "@easy-kit/common/utils/rest";
import { EntryResultPage } from "@/types/pages/entry";

export type SaveEntryResultData = {
    moduleId: number;
    entryId: number;
    content: string;
    language: string;
}

export const save = async (data: SaveEntryResultData): Promise<RestResult<any>> =>
    post(`@i18n/entry/result/save/`, data);

export type EntryResultQuery = {
    entryId: number;
    language: string;
    page: number;
    size: number;
}

export const list = async (data: EntryResultQuery): Promise<RestResult<EntryResultPage>> =>
    get(`@i18n/entry/result/list/`, data);
