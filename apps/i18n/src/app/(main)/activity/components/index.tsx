'use client'

import type { MainLayoutProps } from '@/components/layout/main'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'

export const ActivityPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: 'activity',
  })
  return <div>ActivityPage</div>
}