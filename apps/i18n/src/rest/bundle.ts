import {RestResult} from "@easykit/common/types/rest";
import {get, post} from "@easykit/common/utils/rest";
import {Bundle} from "@/types/pages/bundle";

export type BundleQuery = {
    page: number;
    size: number;
    module: string;
    keyword?: string;
}

export const list = (query: BundleQuery): Promise<RestResult<{
    total: number;
    data: Bundle[];
}>> =>
    get(`@i18n/${query.module}/bundle/list`, query);

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

export const create = (data: AddBundleData): Promise<RestResult<any>> =>
    post(`@i18n/bundle/create`, data);
