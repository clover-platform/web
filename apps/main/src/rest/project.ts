import {get} from "@clover/public/utils/rest";
import {PageResult} from "@clover/public/types/rest";
import {Project} from "@/types/project";

export type ProjectListParams = {
    teamId: number;
    type: string;
    keyword?: string;
    page: number;
    size: number;
}

export type ProjectListResult = PageResult<Project>;

export const list = (params: ProjectListParams): Promise<ProjectListResult> =>
    get(`@main/project/list`, params);
