'use client'

import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import type { MainLayoutProps } from '@/components/layout/main'

const TaskPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'task.list',
  })
  // biome-ignore lint/complexity/noUselessFragments: task
  return <>task</>
}

export default TaskPage
