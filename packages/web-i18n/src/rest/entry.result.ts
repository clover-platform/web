import { RestResult } from "@easy-kit/common/types/rest";
import { post, get, del, put } from "@easy-kit/common/utils/rest";
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

export const deleteResult = async (data: {id: number}): Promise<RestResult<any>> =>
    del(`@i18n/entry/result/delete/`, data);

export const approve = async (data: {id: number}): Promise<RestResult<any>> =>
    put(`@i18n/entry/result/approve/`, data);

export const removeApproval = async (data: {id: number}): Promise<RestResult<any>> =>
    put(`@i18n/entry/result/remove/approval/`, data);
