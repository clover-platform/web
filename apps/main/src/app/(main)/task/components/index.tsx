'use client';

import type { MainLayoutProps } from '@/components/layout/main'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'

const TaskPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "task.list",
  })
  return <>task</> 
};

export default TaskPage;
