import { RestResult } from "@easykit/common/types/rest";
import {del, get, post} from "@easykit/common/utils/rest";
import { EntryComment, EntryResult, EntryResultPage } from "@/types/pages/entry";

export type AddCommentData = {
    module: string;
    entryId: number;
    content: string;
    language: string;
    branch: string;
}

export const add = async (data: AddCommentData): Promise<RestResult<any>> =>
    post(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/comment/add`, data);

export type EntryCommentQuery = {
    module: string;
    entryId: number;
    language: string;
    page: number;
    size: number;
    branch: string;
}

export type EntryCommentPage = {
    total: number;
    data: EntryComment[];
}

export const list = async (data: EntryCommentQuery): Promise<RestResult<EntryCommentPage>> =>
    get(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/comment/list`, data);

export type DeleteCommentData = {
    module: string;
    entryId: number;
    branch: string;
    id: number;
}
export const deleteComment = async (data: DeleteCommentData): Promise<RestResult<EntryCommentPage>> =>
    del(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/comment/${data.id}`);
