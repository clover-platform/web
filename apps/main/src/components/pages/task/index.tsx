'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";

const TaskPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "task.list",
        path: [
            {
                title: "{#任务#}",
                type: "item",
            }
        ],
    })
    return <>
        task
    </>
};

export default TaskPage;