import { del, get, post } from "@clover/public/utils/rest";
import { EntryComment } from "@/types/pages/entry";

export type AddCommentData = {
  module: string;
  entryId: number;
  content: string;
  language: string;
  branch: string;
}

export const add = (data: AddCommentData) =>
  post<any, AddCommentData>(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/comment/add`, data);

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

export const list = (data: EntryCommentQuery) =>
  get<EntryCommentPage, EntryCommentQuery>(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/comment/list`, data);

export type DeleteCommentData = {
  module: string;
  entryId: number;
  branch: string;
  id: number;
}
export const deleteComment = (data: DeleteCommentData) =>
  del<EntryCommentPage>(`@i18n/${data.module}/branch/${data.branch}/entry/${data.entryId}/comment/${data.id}`);
