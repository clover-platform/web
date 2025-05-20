import { get } from "@clover/public/utils/rest";
import { ActivityQueryParams, ActivityResult } from "@/types/pages/activity";
import { PageData } from "@clover/public/types/rest";

export const list = (params: ActivityQueryParams) =>
  get<PageData<ActivityResult>, ActivityQueryParams>(`@i18n/${params.module}/activity/list`, params);
