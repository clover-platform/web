import { RestResult } from "@easy-kit/common/types/rest";
import {del, get, post} from "@easy-kit/common/utils/rest";
import { EntryComment, EntryResult, EntryResultPage } from "@/types/pages/entry";

export type AddCommentData = {
    entryId: number;
    content: string;
    language: string;
}

export const add = async (data: AddCommentData): Promise<RestResult<any>> =>
    post(`@i18n/entry/comment/add`, data);

export type EntryCommentQuery = {
    entryId: number;
    language: string;
    page: number;
    size: number;
}

export type EntryCommentPage = {
    total: number;
    data: EntryComment[];
}

export const list = async (data: EntryCommentQuery): Promise<RestResult<EntryCommentPage>> =>
    get(`@i18n/entry/comment/list`, data);

export const deleteComment = async (id: number): Promise<RestResult<EntryCommentPage>> =>
    del(`@i18n/entry/comment/${id}`);
