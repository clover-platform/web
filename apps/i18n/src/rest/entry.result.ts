import { RestResult } from "@easykit/common/types/rest";
import { post, get, del, put } from "@easykit/common/utils/rest";
import { EntryResultPage } from "@/types/pages/entry";

export type SaveEntryResultData = {
    module: string;
    entryId: number;
    content: string;
    language: string;
}

export const save = async (data: SaveEntryResultData): Promise<RestResult<any>> =>
    post(`@i18n/${data.module}/entry/${data.entryId}/result/save`, data);

export type EntryResultQuery = {
    module: string;
    entryId: number;
    language: string;
    page: number;
    size: number;
}

export const list = async (data: EntryResultQuery): Promise<RestResult<EntryResultPage>> =>
    get(`@i18n/${data.module}/entry/${data.entryId}/result/list`, data);

export type DeleteResultData = {
    module: string;
    entryId: number;
    id: number;
};
export const deleteResult = async (data: DeleteResultData): Promise<RestResult<any>> =>
    del(`@i18n/${data.module}/entry/${data.entryId}/result/${data.id}`);

export type ApproveResultData = {
    module: string;
    entryId: number;
    id: number;
};
export const approve = async (data: ApproveResultData): Promise<RestResult<any>> =>
    put(`@i18n/${data.module}/entry/${data.entryId}/result/${data.id}/approve`);

export type RemoveApproveResultData = {
    module: string;
    entryId: number;
    id: number;
};
export const removeApproval = async (data: RemoveApproveResultData): Promise<RestResult<any>> =>
    put(`@i18n/${data.module}/entry/${data.entryId}/result/${data.id}/remove/approval`);

export type AIData = {
    module: string;
    entryId: number;
    language: string;
}

export const ai = async (data: AIData): Promise<RestResult<any>> =>
    post(`@i18n/${data.module}/entry/${data.entryId}/result/ai`, data);
