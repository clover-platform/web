import { RestResult } from "@easy-kit/common/types/rest";
import {get, post} from "@easy-kit/common/utils/rest";

export type EntryQueryParams = {
    keyword?: string;
    branch?: string;
    moduleId?: number;
    page?: number;
    size?: number;
}

export const list = async (params: EntryQueryParams): Promise<RestResult<any>> =>
    get(`@i18n/entry/list/`, params);

export type CreateEntryData = {
    moduleId: number;
    key: string;
    value: string;
    branches: string[];
}

export const create = async (data: CreateEntryData): Promise<RestResult<any>> =>
    post(`@i18n/entry/create/`, data);
