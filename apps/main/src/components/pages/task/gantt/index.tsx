'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import dynamic from "next/dynamic";
import {MainLayoutProps} from "@/components/layout/main";

const Gantt = dynamic(() => import("@/components/common/gantt"), {ssr: false});

const TaskGanttPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "task.gantt",
    className: "!p-0",
  })

  return <div>
    <Gantt/>
  </div>
};

export default TaskGanttPage;
