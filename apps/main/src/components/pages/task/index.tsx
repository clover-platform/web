'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import { t } from '@easykit/common/utils/locale';

const TaskPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "task.list",
        path: [
            {
                title: t("任务"),
                type: "item",
            }
        ],
    })
    return <>
        task
    </>
};

export default TaskPage;
