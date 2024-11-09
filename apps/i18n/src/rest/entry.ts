import { RestResult } from "@easykit/common/types/rest";
import {get, post, put, del} from "@easykit/common/utils/rest";
import { CountEntryData, CountEntryQuery, Entry } from "@/types/pages/entry";

export type EntryQueryParams = {
    keyword?: string;
    branchId?: number;
    module: string;
    language: string;
    page?: number;
    size?: number;
}

export const list = async (params: EntryQueryParams): Promise<RestResult<any>> =>
    get(`@i18n/${params.module}/entry/list`, params);

export type CreateEntryData = {
    module: string;
    key: string;
    value: string;
    branches: string[];
}
export const create = async (data: CreateEntryData): Promise<RestResult<any>> =>
    post(`@i18n/${data.module}/entry/create`, data);

export type EntryDetailParams = {
    module: string;
    id: number,
    language: string;
}
export const detail = async (params: EntryDetailParams): Promise<RestResult<Entry>> =>
    get(`@i18n/${params.module}/entry/${params.id}`, {
        ...params,
        id: undefined
    });

export type EditEntryData = {
    module: string;
    id: number;
    value: string;
}
export const edit = async (data: EditEntryData): Promise<RestResult<any>> =>
    put(`@i18n/${data.module}/entry/${data.id}`, data);

export type RemoveEntryData = {
    module: string;
    id: number;
}
export const remove = async (data: RemoveEntryData): Promise<RestResult<any>> =>
    del(`@i18n/${data.module}/entry/${data.id}`);

export const count = async (query: CountEntryQuery): Promise<RestResult<CountEntryData>> =>
    get(`@i18n/${query.module}/entry/count`, query);
