import {get} from "@easykit/common/utils/rest";
import {ActivityQueryParams, ActivityResult} from "@/types/pages/activity";

export const list = (params: ActivityQueryParams): Promise<ActivityResult> =>
    get(`@i18n/${params.module}/activity/list`, params);
