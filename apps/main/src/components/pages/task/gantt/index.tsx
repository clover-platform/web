'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import { t } from '@clover/public/locale';
import dynamic from "next/dynamic";
const Gantt = dynamic(() => import("@/components/common/gantt"), { ssr: false });

const TaskGanttPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "task.gantt",
        container: false,
        className: "!p-0",
        path: [
            {
                title: t("任务"),
                type: "item",
            }
        ],
    })

    return <div>
        <Gantt />
    </div>
};

export default TaskGanttPage;
