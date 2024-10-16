import { RestResult } from "@easykit/common/types/rest";
import { post, get, del, put } from "@easykit/common/utils/rest";
import { EntryResultPage } from "@/types/pages/entry";

export type SaveEntryResultData = {
    moduleId: number;
    entryId: number;
    content: string;
    language: string;
}

export const save = async (data: SaveEntryResultData): Promise<RestResult<any>> =>
    post(`@i18n/entry/result/save`, data);

export type EntryResultQuery = {
    entryId: number;
    language: string;
    page: number;
    size: number;
}

export const list = async (data: EntryResultQuery): Promise<RestResult<EntryResultPage>> =>
    get(`@i18n/entry/result/list`, data);

export const deleteResult = async (id: number): Promise<RestResult<any>> =>
    del(`@i18n/entry/result/${id}`);

export const approve = async (id: number): Promise<RestResult<any>> =>
    put(`@i18n/entry/result/${id}/approve`);

export const removeApproval = async (data: {id: number}): Promise<RestResult<any>> =>
    put(`@i18n/entry/result/${data.id}/remove/approval`);

export type AIData = {
    entryId: number;
    language: string;
}

export const ai = async (data: AIData): Promise<RestResult<any>> =>
    post(`@i18n/entry/result/ai`, data);
