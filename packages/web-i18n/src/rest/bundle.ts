import {RestResult} from "@easy-kit/common/types/rest";
import {get} from "@easy-kit/common/utils/rest";
import {Bundle} from "@/types/pages/bundle";

export type BundleQuery = {
    page: number;
    size: number;
    keyword?: string;
}

export const list = async (query: BundleQuery): Promise<RestResult<Bundle>> =>
    get(`@i18n/bundle/list/`, query);
