import { RestResult } from "@clover/public/types/rest";
import { post, get, del, put } from "@clover/public/utils/rest";
import { EntryResultPage } from "@/types/pages/entry";

export type SaveEntryResultData = {
    module: string;
    entryId: number;
    content: string;
    language: string;
    branch: string;
}

export const save = (data: SaveEntryResultData): Promise<RestResult<any>> =>
    post(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/save`, data);

export type EntryResultQuery = {
    module: string;
    entryId: number;
    language: string;
    page: number;
    size: number;
    branch: string;
}

export const list = (data: EntryResultQuery): Promise<RestResult<EntryResultPage>> =>
    get(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/list`, data);

export type DeleteResultData = {
    module: string;
    entryId: number;
    id: number;
    branch: string;
};
export const deleteResult = (data: DeleteResultData): Promise<RestResult<any>> =>
    del(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/${data.id}`);

export type ApproveResultData = {
    module: string;
    entryId: number;
    id: number;
    branch: string;
};
export const approve = (data: ApproveResultData): Promise<RestResult<any>> =>
    put(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/${data.id}/approve`);

export type RemoveApproveResultData = {
    module: string;
    entryId: number;
    id: number;
    branch: string;
};
export const removeApproval = (data: RemoveApproveResultData): Promise<RestResult<any>> =>
    put(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/${data.id}/remove/approval`);

export type AIData = {
    module: string;
    entryId: number;
    language: string;
    branch: string;
}

export const ai = (data: AIData): Promise<RestResult<any>> =>
    post(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/result/ai`, data);
