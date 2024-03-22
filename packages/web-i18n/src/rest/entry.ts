import { RestResult } from "@easy-kit/common/types/rest";
import { post } from "@easy-kit/common/utils/rest";

export type CreateEntryData = {
    moduleId: number;
    key: string;
    value: string;
    branches: string[];
}

export const create = async (data: CreateEntryData): Promise<RestResult<any>> =>
    post(`@i18n/entry/create/`, data);
