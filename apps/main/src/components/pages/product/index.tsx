"use client";

import type { WebLayoutProps } from '@/components/layout/web'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'

export const ProductPage = () => {
  useLayoutConfig<WebLayoutProps>({
    active: "product",
  })

  return <div>ProductPage</div>
}
