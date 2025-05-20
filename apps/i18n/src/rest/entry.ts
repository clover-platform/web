import { get, post, put, del } from "@clover/public/utils/rest";
import { CountEntryData, CountEntryQuery, Entry } from "@/types/pages/entry";

export type EntryQueryParams = {
  module: string;
  language: string;
  keyword?: string;
  branch?: string;
  page?: number;
  size?: number;
}

export const list = (params: EntryQueryParams) =>
  get<any, EntryQueryParams>(`@i18n/${params.module}/branch/${params.branch || "-"}/entry/list`, params);

export const all = (params: EntryQueryParams) =>
  get<any, EntryQueryParams>(`@i18n/${params.module}/branch/${params.branch || "-"}/entry/all`, params);

export const sync = (params: EntryQueryParams) =>
  get<any, EntryQueryParams>(`@i18n/${params.module}/branch/${params.branch || "-"}/entry/sync`, params);

export type CreateEntryData = {
  module: string;
  key: string;
  value: string;
  branches: string[];
}
export const create = (data: CreateEntryData) =>
  post<any, CreateEntryData>(`@i18n/${data.module}/branch/-/entry/create`, data);

export type EntryDetailParams = {
  module: string;
  id?: number,
  language: string;
  branch: string;
}
export const detail = (params: EntryDetailParams) =>
  get<Entry, EntryDetailParams>(`@i18n/${params.module}/branch/${params.branch}/entry/${params.id}`, {
    ...params,
    id: undefined
  });

export type EditEntryData = {
  module: string;
  id: number;
  value: string;
  branch: string;
}
export const edit = (data: EditEntryData) =>
  put<any, EditEntryData>(`@i18n/${data.module}/branch/${data.branch}/entry/${data.id}`, data);

export type RemoveEntryData = {
  module: string;
  id: number;
  branch: string;
}
export const remove = (data: RemoveEntryData) =>
  del<any>(`@i18n/${data.module}/branch/${data.branch}/entry/${data.id}`);

export const count = (query: CountEntryQuery) =>
  get<CountEntryData, CountEntryQuery>(`@i18n/${query.module}/branch/${query.branch || "-"}/entry/count`, query);
