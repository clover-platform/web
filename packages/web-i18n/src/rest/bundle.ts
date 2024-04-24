import {RestResult} from "@easy-kit/common/types/rest";
import {get, post} from "@easy-kit/common/utils/rest";
import {Bundle} from "@/types/pages/bundle";

export type BundleQuery = {
    page: number;
    size: number;
    keyword?: string;
}

export const list = async (query: BundleQuery): Promise<RestResult<{
    total: number;
    data: Bundle[];
}>> =>
    get(`@i18n/bundle/list/`, query);

export type AddBundleDataExport = {
    config: any;
    format: string;
}

export type AddBundleData = {
    name: string;
    sources: string[];
    export: AddBundleDataExport;
    includeSource: boolean;
    moduleId: number;
}

export const create = async (data: AddBundleData): Promise<RestResult<any>> =>
    post(`@i18n/bundle/create/`, data);
