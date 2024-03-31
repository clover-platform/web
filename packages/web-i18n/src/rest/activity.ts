import {get} from "@easy-kit/common/utils/rest";
import {ActivityQueryParams, ActivityResult} from "@/types/pages/activity";

export const list = async (params: ActivityQueryParams): Promise<ActivityResult> =>
    get(`@i18n/activity/list/`, params);
