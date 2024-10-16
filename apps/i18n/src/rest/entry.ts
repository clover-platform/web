import { RestResult } from "@easykit/common/types/rest";
import {get, post, put, del} from "@easykit/common/utils/rest";
import { CountEntryData, CountEntryQuery, Entry } from "@/types/pages/entry";

export type EntryQueryParams = {
    keyword?: string;
    branchId?: number;
    moduleId?: number;
    language: string;
    page?: number;
    size?: number;
}

export const list = async (params: EntryQueryParams): Promise<RestResult<any>> =>
    get(`@i18n/entry/list`, params);

export type CreateEntryData = {
    moduleId: number;
    key: string;
    value: string;
    branches: string[];
}

export const create = async (data: CreateEntryData): Promise<RestResult<any>> =>
    post(`@i18n/entry/create`, data);

export type EntryDetailParams = {
    id: number,
    language: string;
}

export const detail = async (params: EntryDetailParams): Promise<RestResult<Entry>> =>
    get(`@i18n/entry/${params.id}`, {
        ...params,
        id: undefined
    });

export type EditEntryData = {
    id: number;
    value: string;
}

export const edit = async (data: EditEntryData): Promise<RestResult<any>> =>
    put(`@i18n/entry/${data.id}`, data);

export const remove = async (id: number): Promise<RestResult<any>> =>
    del(`@i18n/entry/${id}`);

export const count = async (query: CountEntryQuery): Promise<RestResult<CountEntryData>> =>
    get(`@i18n/entry/count`, query);
