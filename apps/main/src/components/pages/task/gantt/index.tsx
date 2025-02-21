'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "../../../layout/dashboard";
import dynamic from "next/dynamic";

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
