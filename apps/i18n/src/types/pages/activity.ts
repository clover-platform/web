import {RestResult} from "@easykit/common/types/rest";

export type ActivityQueryParams = {
    module: string;
    page: number;
    size: number;
}

export type Activity = {
    id: number;
    moduleId: number;
    userId: number;
    createTime: string;
    type: number;
    subType: number;
    operate: number;
    detail: {
        [key: string]: any;
    };
}

export type ActivityResult = RestResult<{
    data: Activity[];
    total: number;
}>;

export type ActivityGroup = {
    time: string;
    list: Activity[];
}
